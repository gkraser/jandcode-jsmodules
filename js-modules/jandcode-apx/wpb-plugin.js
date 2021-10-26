/* WebpackBuilderPlugin для поддержки apx
----------------------------------------------------------------------------- */
let path = require('path')

let jcTools = require('@jandcode/tools')

class WpbApxPlugin extends jcTools.WebpackBuilderPlugin {

    /**
     * @param options
     * @param {Array} options.tstModules список модулей для использования в тестировании tst.
     * Текущий модуль, где лежит webpack.config.js подключается автоматом
     */
    constructor(options) {
        super(options)
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
    }
}

module.exports = WpbApxPlugin