/* WebpackBuilderPlugin для поддержки apx
----------------------------------------------------------------------------- */
let path = require('path')
let uniq = require('lodash/uniq')
let jcTools = require('@jandcode/tools')
let fs = require('fs')
let globby = require('globby')

class WpbApxPlugin extends jcTools.WebpackBuilderPlugin {

    /**
     * @param options
     * @param {Array} options.tstModules список модулей для использования в тестировании tst.
     * Текущий модуль, где лежит webpack.config.js подключается автоматом
     * @param {Array} options.apxModules список модулей, которые учавствуют в сборке конкретного
     * приложения. В него автоматически будут включены модули @jandcode/apx-ui и текущий модуль,
     * их указывать не нужно.
     */
    constructor(options) {
        super(options)
        this.apxModules = []
        this.themeDefault = this.options.themeDefault || 'apx-std'

        // алиасы по умолчанию
        this.alias = {
            'jquery$': 'jquery/dist/jquery.slim.js',

            'all/themes': '@jandcode/apx/alias/themes-all.js',
            'all/components': '@jandcode/apx/alias/components-all.less',
            'all/vars': '@jandcode/apx/alias/vars-all.less',
            'all/icons': '@jandcode/apx/alias/icons-all.js',
        }
    }

    initBuilder(builder) {
        let opts = this.options

        // подключаем tst
        if (!builder.isProd && !builder.hasPlugin(jcTools.WpbTstPlugin)) {
            let mask1 = 'test/**/*.test.{js,vue}'
            let masks = [path.resolve(builder.basedir, mask1)]
            if (Array.isArray(opts.tstModules)) {
                for (let m of opts.tstModules) {
                    masks.push(`${m}/${mask1}`)
                }
            }
            builder.merge(new jcTools.WpbTstPlugin({
                masks: masks
            }))
        }

        // apxModules
        this.initApxModules(builder)
    }

    initApxModules(builder) {
        let opts = this.options

        // формируем список уникальных модулей
        let modules = ['@jandcode/apx', '@jandcode/apx-ui']
        if (Array.isArray(opts.apxModules)) {
            modules.push(...opts.apxModules)
        }
        let pi = jcTools.splitPath(builder.basedir)
        modules.push(pi.moduleName)
        modules = uniq(modules)
        this.apxModules = modules
    }

    getModuleFiles(mask) {
        let res = []
        for (let mod of this.apxModules) {
            let m1 = mod + '/' + mask
            let mp = jcTools.splitPath(m1)
            let files = globby.sync(mp.filePath, {cwd: mp.modulePath, absolute: true})
            res.push(...files)
        }
        return res
    }

    buildConfig(builder) {
        let res = {
            resolve: {
                alias: {}
            },
        }
        Object.assign(res.resolve.alias, this.alias)

        // ищем темы и общие css
        let themes = {}
        let themeFiles = this.getModuleFiles('src/css/*-theme.js')
        let componentsLessFiles = this.getModuleFiles('src/css/components.less')
        let varsLessFiles = this.getModuleFiles('src/css/vars.less')

        // themes
        for (let themeFile of themeFiles) {
            let pi = jcTools.splitPath(themeFile)
            let themeName = path.basename(themeFile).replace('-theme.js', '')
            let theme = themes[themeName] = {}
            theme.name = themeName
            theme.themeFile = themeFile
            theme.module = pi.moduleName + "/" + pi.filePath
            res.resolve.alias['theme/' + themeName] = themeFile
        }

        // тема по умолчанию
        let themeDefault = themes[this.themeDefault]
        if (themeDefault) {
            res.resolve.alias['theme/default'] = themeDefault.themeFile
        }

        let tmpFile

        // генерим файл со всеми темами
        tmpFile = path.resolve(builder.basedir, `temp/themes-all.js`)
        jcTools.saveFile(tmpFile, this.genThemesAll(Object.values(themes), themeDefault))
        res.resolve.alias['all/themes'] = tmpFile

        // генерим файл со всеми компонентами
        tmpFile = path.resolve(builder.basedir, `temp/components-all.less`)
        jcTools.saveFile(tmpFile, this.genLessAll(componentsLessFiles))
        res.resolve.alias['all/components'] = tmpFile

        // генерим файл со всеми переменными
        tmpFile = path.resolve(builder.basedir, `temp/vars-all.less`)
        jcTools.saveFile(tmpFile, this.genLessAll(varsLessFiles))
        res.resolve.alias['all/vars'] = tmpFile

        // генерим файл со всеми иконками
        tmpFile = path.resolve(builder.basedir, `temp/icons-all.dyn.js`)
        jcTools.saveFile(tmpFile, this.genIconsAll())
        res.resolve.alias['all/icons'] = tmpFile


        return res
    }

    genThemesAll(themes, themeDefault) {
        let s = [`let res = {}, t`]

        let cnt = 0
        for (let theme of themes) {
            cnt++
            s.push(`//`)
            s.push(`import theme${cnt} from '${theme.themeFile}'`)
            s.push(`t = res['${theme.name}'] = {}`)
            s.push(`t.name = '${theme.name}'`)
            s.push(`t.module = '${theme.module}'`)
            s.push(`t.themeFile = '${theme.themeFile}'`)
            s.push(`t.theme = theme${cnt}`)
            if (themeDefault && themeDefault.name === theme.name) {
                s.push(`// default`)
                s.push(`res['default'] = t`)
            }
        }
        s.push(`//`)
        s.push(`export default res`)
        return s.join('\n')
    }

    genLessAll(files) {
        let s = []
        for (let f of files) {
            s.push(`@import '${f}';`)
        }
        return s.join('\n')
    }

    genIconsAll() {
        let masks = []
        let mask = 'assets/icons/**/*.svg'
        for (let mod of this.apxModules) {
            let m1 = mod + '/' + mask
            masks.push(m1)
        }
        return `
let jcTools = require("@jandcode/tools")
module.exports = (options, loaderContext) => {
    return jcTools.svgUtils.genSvgIconsJs({
        masks: ${JSON.stringify(masks)}
    })
}        
        `
    }

}


module.exports = WpbApxPlugin