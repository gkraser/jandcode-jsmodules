let jcTools = require("@jandcode/tools")
let path = require('path')
let fs = require('fs')

let WpbApxPlugin = require('@jandcode/apx/wpb-plugin')

let builder = new jcTools.WebpackBuilder(__dirname)

builder.merge(new WpbApxPlugin({
    tstModules: [
        '@jandcode/apx',
        '@jandcode/apx-ui',
        '@jandcode/base',
        '@jandcode/apx-map',
        '@jandcode/apx-chart',
        '@jandcode/apx-datagrid',
    ],
    apxModules: [
        '@jandcode/apx-map',
        '@jandcode/apx-datagrid',
    ],
    themes: [
        'app',
        'apx-std',
    ],
    themeDefault: 'app',
}))

builder.merge({
    plugins: [],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
})

// перекрытие для конкретного разработчика
let devConfig = path.resolve(__dirname, '_dev.config.js')
if (fs.existsSync(devConfig)) {
    let fn = require(devConfig)
    fn(builder)
}

//
module.exports = builder.build()

//console.info("module.exports", module.exports);
console.info("module.exports.resolve.alias", module.exports.resolve.alias);
