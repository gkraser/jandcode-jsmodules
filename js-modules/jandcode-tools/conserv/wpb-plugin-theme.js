let wpb = require("./webpack-builder")
let path = require('path')
let gen = require('./gen')

module.exports = class Theme_WpbPlugin extends wpb.WebpackBuilderPlugin {

    constructor(options) {
        super(options)
    }


    getMergeConfig() {
        let b = this.builder

        let themes = b.jcAddons.getThemes()

        let aliases = {}

        for (let theme of Object.values(themes)) {
            aliases['theme/' + theme.name] = theme.module
        }

        let config = b.jcAddons.getConfig()
        let themeDefault = config.themeDefault || 'base'
        aliases['theme/default'] = themes[themeDefault].module


        let res = {
            resolve: {
                alias: aliases
            }
        }
        return res
    }
}

