let jcModules = require("./jc-modules")

/**
 * Базовый конфиг для webpack.
 * Подключает все resolve для всех модулей, который сгенерил jc
 */
let webpackBaseConfig = {
    resolve: {
        modules: [
            ...jcModules.resolvePaths
        ],
        alias: {
            ...jcModules.modulesPaths
        }
    },
    resolveLoader: {
        modules: [
            ...jcModules.resolvePaths
        ],
        alias: {
            ...jcModules.modulesPaths
        }
    }
}

module.exports = {
    webpackBaseConfig,
}

