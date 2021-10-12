/*
    Утилиты для модулей
 */

let path = require('path')
let fs = require('fs')
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

module.exports = {
    splitPath,
}
