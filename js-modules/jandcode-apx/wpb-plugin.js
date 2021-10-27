/* WebpackBuilderPlugin для поддержки apx
----------------------------------------------------------------------------- */
let path = require('path')
let uniq = require('lodash/uniq')
let jcTools = require('@jandcode/tools')

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

        // ищем темы
        
    }
}

module.exports = WpbApxPlugin