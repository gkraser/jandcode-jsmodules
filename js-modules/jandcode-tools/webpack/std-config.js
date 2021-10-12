/*
    Стандартный webpack config.
    Предназначен для среды jandcode.
    
 */
let jcTools = require("@jandcode/tools")
let webpack = require('webpack')
let {merge} = require('webpack-merge')
let path = require('path')
let {VueLoaderPlugin} = require('vue-loader')

module.exports = function(options) {
    options = Object.assign({
        basedir: null,
    }, options)

    if (!options.basedir) {
        console.warn("Not defined basedir, used current dir")
        options.basedir = path.resolve(process.cwd())
    }

    let isProd = process.env.NODE_ENV === 'production'
    let basedir = path.resolve(options.basedir)

    let cleanCssLoader = {
        loader: "clean-css-loader",
        options: {
            disable: !isProd,
        },
    }

    let config = {
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? false : 'eval-source-map',
        context: basedir,
        entry: {
            main: './src/index.js',
        },
        output: {
            path: path.resolve(basedir, '_gen/public'),
            filename: '[name].bundle.js',
            chunkFilename: 'chunks/chunk-[id].js',
            assetModuleFilename: 'assets/[hash][ext][query]',
            clean: isProd,
            library: {
                name: 'MainApp',
                type: 'var',
            },
        },
        optimization: {
            splitChunks: {},
            minimize: isProd,
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        resolve: {
            extensions: ['...', '.vue'],
            alias: {
                'vue$': 'vue/dist/vue.esm-bundler.js'
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        'css-loader',
                        cleanCssLoader
                    ],
                },
                {
                    test: /\.less$/i,
                    use: [
                        'css-loader',
                        cleanCssLoader,
                        'less-loader',
                    ],
                },
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: jcTools.jcVueLoader,
                            options: {
                                hotReload: false
                            }
                        }
                    ]
                },
                {
                    test: /.dyn.js$/,
                    use: [
                        'val-loader',
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
            }),
            new VueLoaderPlugin(),
        ],
    }

    //
    return merge(jcTools.webpackBaseConfig, config)
}

