let jcTools = require("@jandcode/tools")
let path = require('path')

let WpbApxPlugin = require('@jandcode/apx/wpb-plugin')

let builder = new jcTools.WebpackBuilder(__dirname)

builder.merge(new WpbApxPlugin({
    tstModules: [
        '@jandcode/apx',
        '@jandcode/apx-ui',
        '@jandcode/base',
        '@jandcode/apx-map',
    ],
    apxModules: []
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

module.exports = builder.build()

//console.info("module.exports", module.exports);
console.info("module.exports.resolve.alias", module.exports.resolve.alias);
