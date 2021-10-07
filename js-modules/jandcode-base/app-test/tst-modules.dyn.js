let jcTools = require('@jandcode/tools')

module.exports = (options, loaderContext) => {
    let a = Object.assign(
        jcTools.getModuleRegistry('@jandcode/base', ['src/_tst/**/*.test.js']),
    )
    return {
        code: jcTools.genJsModuleReqistry(a)
    }
}
