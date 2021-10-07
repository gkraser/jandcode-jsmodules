let fs = require('fs')
let path = require('path')


/**
 * Генерация  текста в файл
 * @param tofile куда
 * @param text текст
 */
function gen_tofile(tofile, text) {
    tofile = path.resolve(tofile)
    let outDir = path.dirname(tofile)
    fs.mkdirSync(outDir, {recursive: true})
    fs.writeFileSync(tofile, text)
}

/**
 * Генереация модуля с подключением динамических модулей
 * @param tofile куда
 * @param modules какие модули использовать
 * @param masks маски файлов для включения
 */
function gen_dynModules(tofile, modules, masks) {

    let modText = []

    for (let m of modules) {
        modText.push(`    r.addModuleFiles(${JSON.stringify(m)},masks)`)
    }

    let text = `\
let jcTools = require('@jandcode/tools')

module.exports = (options, loaderContext) => {
    let masks = ${JSON.stringify(masks)}
    let r = jcTools.createModuleRegistry()
${modText.join(',\n')}
    return {
        cacheable: true,
        code: r.genJs_dynModules(),
        contextDependencies: r.getDirs()
    }
}`
    return gen_tofile(tofile, text)
}


module.exports = {
    gen_tofile,
    gen_dynModules,
}
