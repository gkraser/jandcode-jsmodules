//
let jcModules = require("./jc-modules")
let webpackBaseConfig = require("./webpack-base-config")
let jcVueLoader = require.resolve('./vue-loader')

module.exports = {
    jcModules,
    webpackBaseConfig,
    jcVueLoader,
}
