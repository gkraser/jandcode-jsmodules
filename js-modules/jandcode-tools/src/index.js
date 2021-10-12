//
let jcModules = require("./jc-modules")
let webpackBaseConfig = require("./webpack-base-config")
let jcVueLoader = require.resolve('./vue-loader')
let fileUtils = require('./file-utils')
let moduleUtils = require('./module-utils')

module.exports = {
    jcModules,
    webpackBaseConfig,
    jcVueLoader,
    ...fileUtils,
    ...moduleUtils,
}
