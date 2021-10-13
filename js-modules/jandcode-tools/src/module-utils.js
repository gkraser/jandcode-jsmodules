/*
    Утилиты для модулей
 */

let path = require('path')
let fs = require('fs')
let globby = require('globby')
let fileUtils = require('./file-utils')


/**
 * Разделяет путь внутри модуля на запчасти и возвращает объкт с полями:
 * moduleName - имя модуля
 * modulePath - абсолютный путь до корня модуля
 * filePath - путь до файла внутри модуля
 *
 * Если не найден модуль - генерируется ошибка
 *
 * @param filePath путь
 * @example
 * splitTest("vue/b")
 * splitTest("vue")
 * splitTest("@jandcode/tools/*.js")
 * splitTest("@jandcode/tools")
 * splitTest(path.resolve(__dirname, "./src/*.js"))
 */
function splitPath(filePath) {
    filePath = fileUtils.normSlash(filePath)

    let packageJsonFile
    let packageJson
    let packageJsonDir

    let findPackageJson = (fromPath) => {
        packageJsonFile = fileUtils.findUp("package.json", fromPath)
        if (!packageJsonFile) {
            throw new Error("Not found package.json from path: " + fromPath)
        }
        packageJson = fileUtils.loadJson(packageJsonFile)
        packageJsonDir = fileUtils.normSlash(path.dirname(packageJsonFile))
    }

    let isAbs = path.isAbsolute(filePath)
    let isModName = !isAbs && !filePath.startsWith(".")
    if (!isAbs && !isModName) {
        throw new Error("Path must be absolute or module-relative: " + filePath)
    }
    if (isModName) {
        let parts = filePath.split("/")
        let atModule = parts[0].startsWith('@')
        if (atModule && parts.length < 2) {
            throw new Error(`Path must be dir or file in module: ${filePath}`)
        }
        let modName
        if (atModule) {
            modName = parts[0] + "/" + parts[1]
            parts = parts.slice(2)
        } else {
            modName = parts[0]
            parts = parts.slice(1)
        }
        let modPath = require.resolve(modName)
        findPackageJson(modPath)
        return {
            moduleName: packageJson.name,
            modulePath: packageJsonDir,
            filePath: parts.join("/"),
        }
    } else {
        findPackageJson(filePath)
        return {
            moduleName: packageJson.name,
            modulePath: packageJsonDir,
            filePath: fileUtils.normSlash(path.relative(packageJsonDir, filePath)),
        }
    }
}

/**
 * Генерация модуля js с набором динамических модулей.
 * Динамический модуль - это сопостовление имени внутри модуля абсолютному имени файла.
 * Такие модули импортируются через динамический импорт
 * с помощью @jandcode/base moduleRegistry
 *
 * @param masks набор масок js-файлов в формате module-utils/splitPath
 */
function genDynModules({masks}) {
    if (!Array.isArray(masks)) {
        throw new Error("'masks' must be array")
    }
    let jsFiles = {}
    let dirs = {}
    for (let mask of masks) {
        let mp = splitPath(mask)
        let files = globby.sync(mp.filePath, {cwd: mp.modulePath, absolute: true})
        for (let file of files) {
            let dir = path.resolve(path.dirname(file))
            dirs[dir] = 1
            let nm = mp.moduleName + "/" + fileUtils.normSlash(path.relative(mp.modulePath, file))
            jsFiles[nm] = file
        }
    }
    let code = []
    code.push(`let a = require('@jandcode/base').moduleRegistry.addModule`)
    for (let nm in jsFiles) {
        let f = jsFiles[nm]
        code.push(`a(${JSON.stringify(nm)},()=>import(${JSON.stringify(f)}))`)
    }
    return {
        cacheable: true,
        code: code.join("\n"),
        contextDependencies: Object.keys(dirs)
    }
}

module.exports = {
    splitPath,
    genDynModules,
}
