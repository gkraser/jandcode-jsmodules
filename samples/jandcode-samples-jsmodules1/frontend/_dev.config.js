/* Настройка builder для конкретного разработчика
----------------------------------------------------------------------------- */

let WpbApxPlugin = require('@jandcode/apx/wpb-plugin')

module.exports = function(builder) {
    let apxPlugin = builder.findPlugin(WpbApxPlugin)
    if (apxPlugin) {
        apxPlugin.options.tstModules.push(
            '@jandcode/apx-ui',
        )
    }
}
