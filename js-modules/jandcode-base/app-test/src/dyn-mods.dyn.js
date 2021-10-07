let jcTools = require('@jandcode/tools')

module.exports = (options, loaderContext) => {
    let a = Object.assign(
        jcTools.getModuleRegistry(__dirname, 'src/dyn-mods/**/*.js'),
    )
    return {
        code: jcTools.genJsModuleReqistry(a)
    }
}
