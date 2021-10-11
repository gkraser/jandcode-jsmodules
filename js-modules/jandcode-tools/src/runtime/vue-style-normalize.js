/*
    Нормализация стилей для jandcode

 */
let cssUtils = require("@jandcode/base/src/css")

module.exports = function vueStyleNormalize(
    scriptExports,
    styles,
) {
    if (!styles) {
        return
    }
    let stylesArr = cssUtils.normCssArray(styles)

    function fnStylesBeforeCreate() {
        for (let st of stylesArr) {
            cssUtils.applyCss(st, scriptExports.applyCss_place)
        }
    }

    let existing = scriptExports.beforeCreate
    scriptExports.beforeCreate = existing
        ? [].concat(existing, fnStylesBeforeCreate)
        : [fnStylesBeforeCreate]


    for (let style of styles){
        console.info("normalise for ",style);
    }
    

    /*
        // Vue.extend constructor export interop
        var options = typeof scriptExports === 'function'
            ? scriptExports.options
            : scriptExports

        // render functions
        if (render) {
            options.render = render
            options.staticRenderFns = staticRenderFns
            options._compiled = true
        }

        // functional template
        if (functionalTemplate) {
            options.functional = true
        }

        if (styles) {
            let stylesArr = cssUtils.normCssArray(styles)

            function fnStylesBeforeCreate() {
                for (let st of stylesArr) {
                    cssUtils.applyCss(st, options.applyCss_place)
                }
            }

            let existing = options.beforeCreate
            options.beforeCreate = existing
                ? [].concat(existing, fnStylesBeforeCreate)
                : [fnStylesBeforeCreate]
        }

        return {
            exports: scriptExports,
            options: options
        }

     */
}
