let path = require('path')
const webpack = require('webpack');

let jcTools = require("@jandcode/tools")
let {merge} = require('webpack-merge')
let stdConfig = require("@jandcode/tools/webpack/std-config")

/**
 * Создание конфигурации для указанной точки входа из wp-data
 */
function wpConfig(entry) {

    let basedir = path.resolve(__dirname, 'wp-data')

    let appConfig = {
        mode: 'development',
        devtool: false,
        entry: {
            main: './' + entry,
        },
        output: {
            path: path.resolve(basedir, '../../temp/wp-out', entry),
        },
    }

    return merge(stdConfig({
        basedir: basedir
    }), appConfig)
}

/**
 * Компиляция
 * @param compiler
 * @return {Promise<unknown>}
 */
function wpCompileRun(compiler) {
    return new Promise((resolve, reject) => {
        compiler.run((error, stats) => {
            if (error) {
                return reject(error);
            }
            if (stats.compilation.errors.length > 0) {
                return reject(stats.compilation.errors[0]);
            }
            return resolve(stats);
        });
    });
}

/**
 * Компиляция конфигурации
 * @param config
 * @return {Promise<unknown>}
 */
async function wpCompile(config) {
    let wp = webpack(config)
    return await wpCompileRun(wp)
}

module.exports = {
    wpConfig,
    wpCompile,
    wpCompileRun,
}