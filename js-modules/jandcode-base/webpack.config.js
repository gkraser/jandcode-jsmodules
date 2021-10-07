/*

    Это для локальной сборки (возможно) и тестирования!

 */
let jcTools = require("@jandcode/tools")
const {merge} = require('webpack-merge')
let path = require('path')

let isProd = process.env.NODE_ENV === 'production'

let appConfig = {
    mode: isProd ? 'production' : 'development',
    //mode: 'production',
    devtool: isProd ? false : 'eval-source-map',
    //devtool: 'cheap-source-map',  // исходники смотреть в main.js
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '_gen'),
        filename: '[name].bundle.js',
        chunkFilename: 'chunk-[id].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
        library: {
            name: 'MainEntry',
            type: 'var',
        },
    },
    optimization: {},
    watchOptions: {
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'css-loader'
                ],
            },
        ],
    },
    plugins: [
    ],
}

module.exports = merge(jcTools.webpackBaseConfig, appConfig)
