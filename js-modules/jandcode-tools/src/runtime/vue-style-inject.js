/*
    Нормализация стилей для jandcode в runtime.
    Вызывается в скрипте, который получен из vue-файла.
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
    if (scriptExports.__file) {
        // проставляем moduleId, если есть __file
        for (let style of stylesArr) {
            style.moduleId = scriptExports.__file
        }
    }

    // эта функция станет методом beforeCreate
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
}
