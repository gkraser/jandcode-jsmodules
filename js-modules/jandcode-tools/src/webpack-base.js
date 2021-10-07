let jcMods = require("./jc-modules")

/**
 * Базовый конфиг для webpack.
 * Подключает все resolve для всех модулей, который сгенерил jc
 */
let webpackBaseConfig = {
    resolve: {
        modules: [
            ...jcMods.resolvePaths
        ],
        alias: {
            ...jcMods.modulesPaths
        }
    },
    resolveLoader: {
        modules: [
            ...jcMods.resolvePaths
        ],
        alias: {
            ...jcMods.modulesPaths
        }
    }
}

module.exports = {
    webpackBaseConfig,
}

