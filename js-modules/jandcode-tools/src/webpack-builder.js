/* Построитель стандартной кофигурации webpack для проектов jandcode

Обычно используется так:

let jcTools = require('@jandcode/tools')
let b = jcTools.createWebpackBuilder(__dirname)
module.exports = b.build()

----------------------------------------------------------------------------- */

let path = require('path')
let fs = require('fs')
let webpackMerge = require('webpack-merge')
let VirtualModulesPlugin = require('webpack-virtual-modules');

let webpackBase = require('./webpack-base')
let addons = require('./addons')
let jcVueLoader = require.resolve('./vue-loader')
let gen = require('./gen')


/**
 * Базовый плагин для WebpackBuilder
 */
class WebpackBuilderPlugin {

    constructor(options) {
        this.options = {}
        Object.assign(this.options, options)

        /**
         * Какой builder является владельцем
         * @type {WebpackBuilder}
         */
        this.builder = null
    }

    /**
     * Возвращает конфигурацию, которая будет объеденена со строящейся
     * @return {Object} конфигурация webpack, которая будет объеденена со строящейся
     */
    getMergeConfig() {
        return null
    }

}

/**
 * Построитель стандартной кофигурации webpack для проектов jandcode
 */
class WebpackBuilder {

    constructor(basedir) {
        if (!basedir) {
            throw new Error('basedir not assigned for WebpackBuilder')
        }
        if (!path.isAbsolute(basedir)) {
            throw new Error('basedir is not absolute path for WebpackBuilder')
        }

        /**
         * Базовый каталог. Обычно это каталог, в котором находится
         * файл webpack.config.js
         * @type {string}
         */
        this.basedir = basedir

        /**
         * Главная точка входа.
         * Точка входа main формируется особым способом. Остальные - как пожелаете.
         * @type {string}
         */
        this.entryMain = './src/index.js'

        //////

        // режим prod
        this._isProd = process.env.NODE_ENV === 'production'
        // дополнения всякие
        this.jcAddons = addons.getAddons(this.basedir)
        // дополнительные конфигурации для merge
        this._mergeConfigs = []
        // дополнительные import для main
        this._entryMainImports = []
        // plugins
        this._plugins = []
    }

    build() {
        if (this.isProd) {
            console.info(`webpack PRODUCTION build in ${this.basedir}`);
        }

        let merges = []
        for (let m of this._mergeConfigs) {
            if (typeof m === 'function') {
                merges.push(m(this))
            } else {
                merges.push(m)
            }
        }

        let mergesPlugins = []
        for (let p of this._plugins) {
            let cfg = p.getMergeConfig()
            if (cfg) {
                mergesPlugins.push(cfg)
            }
        }

        //
        return webpackMerge.merge(
            webpackBase.webpackBaseConfig,
            ...this.jcAddons.getWebpackBaseConfigs(),
            this._buildConfig(),
            ...mergesPlugins,
            ...merges
        )
    }

    /**
     * Включен ли prod-режим.
     * @type {boolean}
     */
    get isProd() {
        return this._isProd
    }

    /**
     * Добавить конфигурацию, которая объеденится с основной
     * @param {Object|Function} config либо объект-конфигурация, либо функция,
     * которая на входе принимает экземпляр WebpackBuilder и возвращает
     * объект-конфигурацию.
     */
    merge(config) {
        this._mergeConfigs.push(config)
    }

    /**
     * Добавить модули для импорта перед main.
     * @param modules модули для добавления
     */
    addEntryMainImport(...modules) {
        for (let m of modules) {
            this._entryMainImports.push(m)
        }
    }

    /**
     * Добавить плагин
     */
    addPlugin(plugin) {
        plugin.builder = this
        this._plugins.push(plugin)
    }

    ////// privates

    /**
     * Основная конфигурация
     * @return {Object}
     * @private
     */
    _buildConfig() {
        let isProd = this.isProd
        let basedir = this.basedir
        let virtualModules = new VirtualModulesPlugin()

        let entry_main_import = [].concat(this._entryMainImports, [this.entryMain])

        let config = {
            mode: isProd ? 'production' : 'development',
            devtool: isProd ? false : 'eval-source-map',
            context: path.resolve(basedir),
            entry: {
                main: {
                    import: entry_main_import,
                }
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
            },
            watchOptions: {
                ignored: /node_modules/,
            },
            resolve: {
                extensions: ['...', '.vue'],
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
                        test: /\.less$/i,
                        use: [
                            'css-loader',
                            'less-loader',
                        ],
                    },
                    {
                        test: /\.(woff|woff2)/,
                        type: 'asset/resource',
                    },
                    {
                        test: /\.vue$/,
                        loader: jcVueLoader,
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
                virtualModules,
            ],
        }
        //
        return config
    }
}

/**
 * Создать экземпляр WebpackBuilder
 * @param basedir базовый каталог, обычно указывается __dirname
 * @return {WebpackBuilder}
 */
function createWebpackBuilder(basedir) {
    return new WebpackBuilder(basedir)
}

module.exports = {
    WebpackBuilderPlugin,
    WebpackBuilder,
    createWebpackBuilder,
}
