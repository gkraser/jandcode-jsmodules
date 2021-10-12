/*

Утилиты для файлов

 */

let path = require('path')
let fs = require('fs')

/**
 * Нормализация слешей: '\' заменяет на '/'
 * @param s
 * @return {*}
 */
function normSlash(s) {
    if (!s) {
        return s
    }
    return s.replace(/\\/g, '/')
}

/**
 * Найти файл fileName вверх по каталогам, начиная с fromPath
 * @param fileName
 * @param fromPath
 * @return {string|null}
 */
function findUp(fileName, fromPath) {
    fromPath = path.resolve(fromPath)
    let lastPath = null
    while (fromPath && lastPath !== fromPath) {
        let f = path.resolve(fromPath, fileName)
        if (fs.existsSync(f)) {
            return f
        }
        lastPath = fromPath
        fromPath = path.dirname(fromPath)
    }
    return null
}

/**
 * Загрузить json
 */
function loadJson(fn) {
    let rawdata = fs.readFileSync(fn)
    return JSON.parse(rawdata.toString());
}

module.exports = {
    normSlash,
    findUp,
    loadJson,
}
