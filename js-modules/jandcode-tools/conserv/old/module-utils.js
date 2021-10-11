/* Утилиты для модулей
----------------------------------------------------------------------------- */

let path = require('path')
let fs = require('fs')
let globby = require('globby')
let ModuleFinder = require('./module-finder')

let moduleFinderInst = new ModuleFinder()

function findUp(fileName, fromPath) {
    fromPath = path.resolve(fromPath)
    while (fromPath) {
        let f = path.resolve(fromPath, fileName)
        if (fs.existsSync(f)) {
            return f
        }
        fromPath = path.dirname(fromPath)
    }
    return null
}

/**
 * По имени модуля возвращает корневой каталог модуля.
 * Если модуль не найден - ошибка.
 * @param {String} moduleName
 */
function getModulePath(moduleName) {
    try {
        // ищем package.json
        let pjf = require.resolve(moduleName + "/package.json")
        return path.dirname(pjf)
    } catch(e) {
        // убеждаемся, что это реально модуль
        let entryPoint = require.resolve(moduleName)
        // не смогли, либо нет package.json, либо модуль не разрешил экспорт package.json
        let p = path.dirname(entryPoint)
        let f = findUp("package.json", p)
        if (f == null) {
            return p
        }
        return path.dirname(f)
    }
}

/**
 * Для модуля по маске возвращает список файлов в нем
 * @param moduleName имя модуля
 * @param masks маски относительно корня модуля. Может быть массивом или строкой
 * @return {*} список абсолютных путей
 */
function getModuleFiles(moduleName, masks) {
    if (!Array.isArray(masks)) {
        masks = [masks]
    }
    let moduleRoot = getModulePath(moduleName)
    return globby.sync(masks, {cwd: moduleRoot, absolute: true})
}

/**
 * По абсолютному имени возвращает имя в модуле.
 * Например для файла /home/ws/node_modules/@my/pak/src/file.js
 * вернет @my/pak/src/file.js
 *
 * @param absoluteFileName абсолютное имя файла
 * @return имя модуля или null, если не удалось определить
 */
function fileToModule(absoluteFileName) {
    return moduleFinderInst.findModule(absoluteFileName)
}

/**
 * По абсолютному имени возвращает id модула для использования в webpack.
 *
 * Например для файла /home/ws/node_modules/@my/pak/src/file.js
 * вернет node_modules/@my/pak/src/file.js
 *
 * Например для файла /home/ws/@my/pak/src/file.js
 * вернет @my/pak/src/file.js
 *
 * @param absoluteFileName абсолютное имя файла
 * @return имя модуля или null, если не удалось определить
 */
function fileToModuleId(absoluteFileName) {
    let s = fileToModule(absoluteFileName)
    if (s != null) {
        if (absoluteFileName.indexOf('node_modules') !== -1) {
            s = 'node_modules/' + s
        }
    }
    return s
}

/**
 * Для списка модулей генерирует текст js для регистрации модулей
 * @param {Object[]} modules
 * @param {String} modules.name
 * @param {String} modules.file
 */
function genJsModuleReqistry(modules) {
    let res = []
    res.push(`let a = require('@jandcode/base').moduleRegistry.addModule`)
    for (let n in modules) {
        let f = modules[n]
        f = f.replace(/\\/g, '/')
        res.push(`a('${n}',()=>import('${f}'))`)
    }
    return res.join('\n')
}

module.exports = {
    getModulePath,
    getModuleFiles,
    fileToModule,
    fileToModuleId,
    genJsModuleReqistry,
}
