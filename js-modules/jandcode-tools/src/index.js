//

let jcModules = require("./jc-modules")
let webpackBase = require("./webpack-base")
let moduleUtils = require("./module-utils")
let moduleRegistry = require("./module-registry")
let addons = require("./addons")
let webpackBuilder = require("./webpack-builder")
let Tst_WpbPlugin = require("./wpb-plugin-tst")
let Theme_WpbPlugin = require("./wpb-plugin-theme")

let jcVueLoader = require.resolve('./vue-loader')

module.exports = {
    jcModules,
    jcVueLoader,
    ...webpackBase,
    ...moduleUtils,
    ...moduleRegistry,
    ...addons,
    ...webpackBuilder,
    Tst_WpbPlugin,
    Theme_WpbPlugin,
}
