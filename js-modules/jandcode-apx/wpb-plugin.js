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
     * @param {Array} options.themes список тем, которые нужно включить в генерируемый
     * контент файла all/themes. Если один из элементов '*', то включаются все темы.
     * @param {String} options.themeDefault имя темы по умолчанию, будет доступна как 'theme/default'
     */
    constructor(options) {
        super(options)

        //
        this.options.apxModules = this.options.apxModules || []
        this.options.tstModules = this.options.tstModules || []
        this.options.themes = this.options.themes || []

        //
        this.apxModules = []

        // алиасы по умолчанию
        this.alias = {
            'jquery$': 'jquery/dist/jquery.slim.js',

            'all/themes': '@jandcode/apx/alias/themes-all.js',
            'all/components': '@jandcode/apx/alias/components-all.less',
            'all/icons': '@jandcode/apx/alias/icons-all.js',
        }
    }

    initBuilder(builder) {
        let opts = this.options

        // нужно ли включать tst
        this.isTst = builder.isDebug || jcTools.envFlag('JC_NODE_TST', !builder.isProd)

        // подключаем tst
        if (this.isTst) {
            if (builder.findPlugin(jcTools.WpbTstPlugin) != null) {
                console.warn("jcTools.WpbTstPlugin already in webpack config");
            }
            let mask1 = 'test/**/*.test.{js,vue}'
            let masks = [path.resolve(builder.basedir, mask1)]
            if (Array.isArray(opts.tstModules)) {
                let mods = uniq(opts.tstModules)
                for (let m of mods) {
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
        let componentsLessFiles = this.getModuleFiles('src/components/index.less')

        // themes
        let themesAll = {}
        for (let themeFile of themeFiles) {
            let pi = jcTools.splitPath(themeFile)
            let themeName = path.basename(themeFile).replace('-theme.js', '')
            let theme = themesAll[themeName] = {}
            theme.name = themeName
            theme.themeFile = themeFile
            theme.module = pi.moduleName + "/" + pi.filePath
        }
        for (let needThemeName of this.options.themes) {
            if (needThemeName === '*') {
                Object.assign(themes, themesAll)
            } else {
                let theme = themesAll[needThemeName]
                if (theme) {
                    themes[needThemeName] = theme
                }
            }
        }
        if (Object.keys(themes).length === 0) {
            Object.assign(themes, themesAll)
        }
        for (let theme of Object.values(themes)) {
            res.resolve.alias['theme/' + theme.name] = theme.themeFile
        }

        // тема по умолчанию
        let themeDefaultNameSys = 'apx-std'
        let themeDefaultName = this.options.themeDefault || themeDefaultNameSys
        let themeDefault = themes[themeDefaultName]
        if (!themeDefault) {
            themeDefault = themes[themeDefaultNameSys]
            if (!themeDefault) {
                themeDefault = Object.values(themes)[0]
            }
        }
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

        // генерим файл со всеми иконками
        tmpFile = path.resolve(builder.basedir, `temp/icons-all.dyn.js`)
        jcTools.saveFile(tmpFile, this.genIconsAll())
        res.resolve.alias['all/icons'] = tmpFile


        return res
    }

    genThemesAll(themes, themeDefault) {
        let s = [`let res = {}, t`]

        themes.sort(function(a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        })

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
        let masksJs = []
        let maskJs = 'assets/icons/**/*.js'
        for (let mod of this.apxModules) {
            let m1 = mod + '/' + maskJs
            masksJs.push(m1)
        }
        return `
let jcTools = require("@jandcode/tools")
module.exports = (options, loaderContext) => {
    return jcTools.svgUtils.genSvgIconsJs({
        masks: ${JSON.stringify(masks)},
        masksJs: ${JSON.stringify(masksJs)},
    })
}        
        `
    }

}


module.exports = WpbApxPlugin