/* Иконки

Этот файл напрямую импортировать не нужно, используйте как пример.
----------------------------------------------------------------------------- */

let jcTools = require("@jandcode/tools")

module.exports = (options, loaderContext) => {
    return jcTools.svgUtils.genSvgIconsJs({
        masks: [
            '@jandcode/apx-ui/assets/icons/**/*.svg',
        ]
    })
}
