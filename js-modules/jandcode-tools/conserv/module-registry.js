let moduleUtils = require('./module-utils')
let path = require('path')

/**
 * Реестр модулей.
 * Хранит соответствие между какой-то абстрактной строкой и полным именем файла
 * модуля.
 * Используется для формирования динамически подключаемых модулей с определенными именами.
 */
class ModuleRegistry {

    constructor() {

        /**
         * Данные в формате {name:{name:name,file:file}...}
         * @private
         */
        this._data = {}
    }

    /**
     * Элементы реестра
     * @return {Array} массив объектов вида {name:name, file:file}
     */
    get items() {
        return Object.values(this._data)
    }

    /**
     * Возвращает массив каталогов всех файлов в реестре
     */
    getDirs() {
        let tmp = {}
        for (let en of Object.values(this._data)) {
            tmp[path.dirname(en.file)] = true
        }
        let res = []
        for (let dir of Object.keys(tmp)) {
            res.push(path.resolve(dir))
        }
        return res
    }

    /**
     * Добавить один элемент
     * @param name имя
     * @param file файл
     */
    addOne(name, file) {
        this._data[name] = {name: name, file: file}
    }

    /**
     * Добавить один элемент
     * @param data объект, где ключ=имя, значени=файл
     */
    addData(data) {
        if (!data) {
            return
        }
        for (let n in data) {
            this.addOne(n, data[n])
        }
    }

    /**
     * Добавить файлы модуля
     * @param moduleName какой модуль. Либо каталог, либо имя модуля.
     *        Например '@jandcode/base'
     * @param masks маски файлов в формате globby относительно корня модуля, которые нужно
     *        добавить
     */
    addModuleFiles(moduleName, masks) {
        let mf = moduleUtils.getModuleFiles(moduleName, masks)
        for (let f of mf) {
            let mn = moduleUtils.fileToModule(f)
            this.addOne(mn, f)
        }
    }

    /**
     * Генерирует js-файл с динамическим подключением модулей
     */
    genJs_dynModules() {
        let res = []
        res.push(`let a = require('@jandcode/base').moduleRegistry.addModule`)
        for (let en of Object.values(this._data)) {
            res.push(`a(${JSON.stringify(en.name)},()=>import(${JSON.stringify(en.file)}))`)
        }
        return res.join('\n')
    }

}

/**
 * Создать экземпляр реестра модулей
 * @return {ModuleRegistry}
 */
function createModuleRegistry() {
    return new ModuleRegistry()
}


module.exports = {
    createModuleRegistry,
    ModuleRegistry,
}
