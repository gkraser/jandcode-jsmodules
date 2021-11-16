/*

Построитель стандартной кофигурации webpack для проектов jandcode

Обычно используется так:

let jcTools = require("@jandcode/tools")
let builder = new jcTools.WebpackBuilder(__dirname)
module.exports = builder.build()

----------------------------------------------------------------------------- */

let path = require('path')
let fs = require('fs')
let webpack = require('webpack')
let webpackMerge = require('webpack-merge')
let {VueLoaderPlugin} = require('vue-loader')
let webpackBaseConfig = require("./webpack-base-config")
let jcVueLoader = require.resolve('./vue-loader')
let WebpackNotifierPlugin = require('webpack-notifier')
let moduleUtils = require("./module-utils")
let WebpackAssetsManifest = require('webpack-assets-manifest');

/**
 * Базовый плагин для WebpackBuilder
 */
class WebpackBuilderPlugin {

    constructor(options) {
        this.options = {}
        Object.assign(this.options, options)
    }

    /**
     * Возвращает конфигурацию, которая будет объеденена со строящейся
     * @param {WebpackBuilder} builder экземпляр WebpackBuilder
     * @return {Object} конфигурация webpack, которая будет объеденена со строящейся
     */
    buildConfig(builder) {
    }

    /**
     * Метод для модификации собранной конфигурации webpack
     * @param {WebpackBuilder} builder экземпляр WebpackBuilder
     * @param {Object} config конфигурация webpack
     */
    updateConfig(builder, config) {
    }

    /**
     * Инициализация builder. Вызывается в процессе построения конфигурации
     * как первый этап. Возможно добавление других плагинов.
     * @param {WebpackBuilder} builder
     */
    initBuilder(builder) {
    }
}

/**
 * Построитель стандартной кофигурации webpack для проектов jandcode
 */
class WebpackBuilder {

    /**
     * Конструктор
     * @param basedir базовый каталог, обычно указывается __dirname
     */
    constructor(basedir) {
        if (!basedir) {
            throw new Error('basedir not assigned for WebpackBuilder')
        }
        if (!path.isAbsolute(basedir)) {
            throw new Error('basedir is not absolute path for WebpackBuilder')
        }

        /**
         * Базовый каталог. Обычно это каталог, в котором находится
         * файл `webpack.config.js`, Относительно его будут разрешатся относительные пути.
         * @type {string}
         */
        this.basedir = basedir

        /**
         * Главная точка входа. Массив.
         * Точка входа main формируется особым способом. Остальные - как пожелаете.
         * @type {Array}
         */
        this.entryMain = ['./src/index.js']

        /**
         * Режим production, если true. Автоматом определяется по NODE_ENV
         * @type {boolean}
         */
        this.isProd = process.env.NODE_ENV === 'production'

        /**
         * В какой каталог внутри _gen будет генерироватся бандл
         * @type {string}
         */
        this.outdirPrefix = "frontend"

        /**
         * Имя генерируемой библиотеки
         * @type {string}
         */
        this.libraryName = "JcEntry"

        /**
         * Поддерживать ли hotReload
         * @type {boolean}
         */
        this.hotRelead = false

        //////

        // дополнительные конфигурации для merge или экземпляры WebpackBuilderPlugin
        this._merges = []

    }

    /**
     * Строит конфигурацию webpack и возвращает ее.
     * @return {*}
     */
    build() {
        if (this.isProd) {
            console.info(`webpack PRODUCTION build in ${this.basedir}`);
        }

        // сначала инициализация, состав плагинов может изменится
        for (let m of this._merges) {
            if (m instanceof WebpackBuilderPlugin) {
                m.initBuilder(this)
            }
        }

        let merges = []
        for (let m of this._merges) {
            let cfg = m
            if (cfg instanceof WebpackBuilderPlugin) {
                cfg = cfg.buildConfig(this)
            } else if (typeof cfg === 'function') {
                cfg = cfg(this)
            }
            if (cfg) {
                merges.push(cfg)
            }
        }

        // объединяем конфигурации
        let config = webpackMerge.merge(
            this.buildBaseConfig(),
            this.buildStdConfig(),
            ...merges
        )

        // модифицируем плагинами
        for (let m of this._merges) {
            if (m instanceof WebpackBuilderPlugin) {
                m.updateConfig(this, config)
            }
        }

        // готово
        return config
    }

    /**
     * Добавить конфигурацию, которая объеденится с основной
     * @param {Object|Function} config либо объект-конфигурация, либо функция,
     * которая на входе принимает экземпляр WebpackBuilder и возвращает
     * объект-конфигурацию.
     */
    merge(config) {
        if (!config) {
            throw new Error("No merge config")
        }
        this._merges.push(config)
    }

    /**
     * Найти зарегистрированный плагин по классу
     * @param pluginClass класс плагина
     * @return null, если плагина нет
     */
    findPlugin(pluginClass) {
        for (let p of this._merges) {
            if (p instanceof pluginClass) {
                return p
            }
        }
        return null
    }

    ////// privates

    /**
     * Базовый config. Настраивает пути для jandcode.
     */
    buildBaseConfig() {
        return webpackBaseConfig
    }

    /**
     * Стандартная конфигурация
     */
    buildStdConfig() {
        let isProd = this.isProd
        let basedir = this.basedir

        let cleanCssLoader = {
            loader: "clean-css-loader",
            options: {
                disable: !isProd,
            },
        }
        let cssLoader = {
            loader: "css-loader",
        }

        let plugins = [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
            }),
            new VueLoaderPlugin(),
            // пока запретим // new webpack.ProgressPlugin(),

            new WebpackAssetsManifest({
                output: 'entrypoints-manifest.json',
                entrypoints: true,
                transform: assets => assets.entrypoints
            }),

        ]

        if (!isProd) {
            plugins.push(
                new WebpackNotifierPlugin({
                    skipFirstNotification: true,
                    contentImage: {
                        error: require.resolve('../assets/error.png'),
                    }
                }),
            )
        }


        let config = {
            mode: isProd ? 'production' : 'development',
            devtool: isProd ? false : 'eval-source-map',
            stats: 'minimal',
            context: basedir,
            entry: {
                main: {
                    import: this.entryMain
                },
            },
            output: {
                path: path.resolve(basedir, '_gen', this.outdirPrefix),
                filename: '[name].bundle.js',
                chunkFilename: 'chunks/chunk-[id].js',
                assetModuleFilename: 'assets/[hash][ext][query]',
                clean: isProd,
                library: {
                    name: this.libraryName,
                    type: 'var',
                },
                devtoolModuleFilenameTemplate: moduleUtils.webpackSourceMapPath,
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
                    'vue$': 'vue/dist/vue.esm-bundler.js',
                }
            },
            module: {
                rules: [
                    {
                        test: /\.css$/i,
                        use: [
                            cssLoader,
                            cleanCssLoader
                        ],
                    },
                    {
                        test: /\.less$/i,
                        use: [
                            cssLoader,
                            cleanCssLoader,
                            {
                                loader: 'less-loader'
                            },
                        ],
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            cssLoader,
                            cleanCssLoader,
                            {
                                loader: 'sass-loader',
                                options: {
                                    sassOptions: {
                                        verbose: true
                                    }
                                }
                            },
                        ],
                    },
                    {
                        test: /\.vue$/,
                        use: [
                            {
                                loader: jcVueLoader,
                                options: {
                                    hotReload: this.hotRelead
                                }
                            }
                        ]
                    },
                    {
                        test: /.dyn.js$/,
                        use: [
                            {
                                loader: 'val-loader'
                            },
                        ],
                    },
                    {
                        test: /.png$/,
                        type: 'asset/resource',
                    },
                    {
                        test: /.svg$/,
                        type: 'asset/resource',
                    },
                    {
                        test: /.html$/,
                        type: 'asset/source',
                    },
                ],
            },
            plugins: plugins,
        }

        //
        return config
    }

}

//////

module.exports = {
    WebpackBuilder,
    WebpackBuilderPlugin,
}
