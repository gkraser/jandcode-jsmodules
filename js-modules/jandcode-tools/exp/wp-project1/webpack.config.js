let jcTools = require('@jandcode/tools')
let b = jcTools.createWebpackBuilder(__dirname)
b.merge({
    output: {
        filename: '[name].bundle-file.js',
    }
})
b.merge(function(b) {
    console.info("merge func");
    return {
        output: {
            library: {
                name: 'MainApp1',
            },
        }
    }
})
module.exports = b.build()

//console.dir(module.exports, { depth: null });
