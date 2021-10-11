/*
    Нормализация стилей для jandcode

 */
let cssUtils = require("@jandcode/base/src/css")

module.exports = function vueStyleNormalize(
    scriptExports,
    styles,
) {
    console.info("Normalise for ",styles);

    if (!styles) {
        return
    }
    let stylesArr = cssUtils.normCssArray(styles)
    if (scriptExports.__file) {
        for (let style of stylesArr){
            style.moduleId = scriptExports.__file
        }
    }

    console.info("stylesArr ",stylesArr);

    function fnStylesBeforeCreate() {
        for (let st of stylesArr) {
            cssUtils.applyCss(st, scriptExports.applyCss_place)
        }
    }

    let existing = scriptExports.beforeCreate
    scriptExports.beforeCreate = existing
        ? [].concat(existing, fnStylesBeforeCreate)
        : [fnStylesBeforeCreate]
    scriptExports.__styles_jc = stylesArr


    for (let style of stylesArr){
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
