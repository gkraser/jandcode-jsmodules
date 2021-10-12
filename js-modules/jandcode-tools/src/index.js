//
let jcModules = require("./jc-modules")
let webpackBaseConfig = require("./webpack-base-config")
let jcVueLoader = require.resolve('./vue-loader.')
let fileUtils = require.resolve('./file-utils')
let moduleUtils = require.resolve('./module-utils')

module.exports = {
    jcModules,
    webpackBaseConfig,
    jcVueLoader,
    ...fileUtils,
    ...moduleUtils,
}
