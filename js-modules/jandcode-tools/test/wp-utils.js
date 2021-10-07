let path = require('path')
const webpack = require('webpack');

let jcTools = require("@jandcode/tools")
let {merge} = require('webpack-merge')
let VirtualModulesPlugin = require('webpack-virtual-modules');
let jcVueLoader = require.resolve('../src/vue-loader')

/**
 * Создание конфигурации для указанной точки входа из wp-data
 */
function wpConfig(entry) {
    let virtualModules = new VirtualModulesPlugin()

    let appConfig = {
        mode: 'development',
        devtool: false,
        context: path.resolve(__dirname, 'wp-data'),
        entry: {
            main: './' + entry,
        },
        output: {
            path: path.resolve(__dirname, '../temp/wp-out', entry),
            filename: "[name].bundle.js",
            chunkFilename: "[name].chunk.js",
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        'css-loader'
                    ],
                },
                {
                    test: /\.less/i,
                    use: [
                        'css-loader',
                        'less-loader'
                    ],
                },
                {
                    test: /\.vue$/,
                    use: [
                        jcVueLoader
                    ]
                },

            ],
        },
        plugins: [
            virtualModules
        ],
    }

    return merge(jcTools.webpackBaseConfig, appConfig)
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