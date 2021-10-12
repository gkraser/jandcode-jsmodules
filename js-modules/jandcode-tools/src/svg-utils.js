/*
    Утилиты для svg
 */

let path = require('path')
let fs = require('fs')
let globby = require('globby')
let moduleUtils = require('./module-utils')

/**
 * Генерация модуля js с набором svg-иконок.
 * @param masks набор масок svg-файлов в формате module-utils/splitPath
 * @return объект для возврата из val-loader
 */
function genSvgIconsJs({masks}) {
    if (!Array.isArray(masks)) {
        throw new Error("'masks' must be array")
    }
    let iconFiles = {}
    let dirs = {}
    for (let mask of masks) {
        let mp = moduleUtils.splitPath(mask)
        let files = globby.sync(mp.filePath, {cwd: mp.modulePath, absolute: true})
        for (let file of files) {
            let nm = path.basename(file, path.extname(file))
            iconFiles[nm] = file
            let dir = path.resolve(path.dirname(file))
            dirs[dir] = 1
        }
    }
    for (let nm in iconFiles) {
        let fn = iconFiles[nm]
        let content = fs.readFileSync(fn).toString()
        //todo svg содержимое как-то минифицировать
        iconFiles[nm] = content
    }
    let code = 'module.exports = ' + JSON.stringify(iconFiles, null, 4)
    return {
        cacheable: true,
        code: code,
        contextDependencies: Object.keys(dirs)
    };
}

module.exports = {
    genSvgIconsJs,
}
