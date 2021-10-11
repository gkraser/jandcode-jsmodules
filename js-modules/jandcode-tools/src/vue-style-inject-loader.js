/*
    Загрузчик для внедоения и нормализации стилей для jandcode.
    Этот загрузчик нужно поставить после vue-loader.

    После того, как отработал vue-loader в тексте скрипта делаеет следующее:

    * убирает импорты стилей, которые сгенерировал vue-loader
    * делает inline-импорты стилей (как текст) и инжектит их в компонент
    * принимает стили с использованием applyCss из jandcode-base
    
 */

let regexImportStyle = /import\s+"(.+vue&type=style&.+)"/gm

let vueStyleNormalizeImport = '@jandcode/tools/src/runtime/vue-style-inject'

module.exports = function(source) {
    let loaderContext = this
    let {
        resourceQuery,
    } = loaderContext

    if (resourceQuery) {
        // это не основной скрипт, а запчасти
        return source
    }

    // ищем импорты стилей
    let importStyles = []
    let m = source.matchAll(regexImportStyle)
    for (let m1 of m) {
        importStyles.push(m1[1])
    }

    if (importStyles.length > 0) {
        // удаляем старые импорты стилей
        source = source.replace(regexImportStyle, "")
        // делаем импорты стилей и инжектим их
        let src = [`require('${vueStyleNormalizeImport}')(__exports__,[`]
        for (let st of importStyles) {
            let qr = st + '&inline'
            src.push(`    require("${qr}").default,`)
        }
        src.push(`])`)
        source = source + "\n\n// inject styles for jandcode\n" + src.join("\n")
    }

    return source
}