//
let jcModules = require("./jc-modules")
let webpackBaseConfig = require("./webpack-base-config")
let jcVueLoader = require.resolve('./vue-loader')
let envUtils = require('./env-utils')
let fileUtils = require('./file-utils')
let moduleUtils = require('./module-utils')
let svgUtils = require('./svg-utils')
let webpackBuilder = require('./webpack-builder')
let WpbTstPlugin = require('./wpb-tst-plugin')
let ModuleIdsPlugin = require('./webpack-moduleids')

module.exports = {
    jcModules,
    webpackBaseConfig,
    jcVueLoader,
    ...envUtils,
    ...fileUtils,
    ...moduleUtils,
    svgUtils,
    ...webpackBuilder,
    WpbTstPlugin,
    ModuleIdsPlugin,
}
