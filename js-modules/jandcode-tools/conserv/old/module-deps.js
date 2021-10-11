/* Утилиты для зависимостей модулей
----------------------------------------------------------------------------- */
let fs = require('fs');

let moduleUtils = require('./module-utils')

function loadJson(fn) {
    let rawdata = fs.readFileSync(fn)
    return JSON.parse(rawdata);
}

class ModuleCacheItem {

    constructor(name) {
        /**
         * Имя модуля
         */
        this.name = name
        /**
         * Путь до корня модуля
         */
        this.path = moduleUtils.getModulePath(name)
        /**
         * Содержимое package.json
         */
        this.packageJson = loadJson(this.path + "/package.json")
    }

    /**
     * Список имен зависимостей из package.json из раздела type
     */
    getDependNames(type) {
        let res = []
        let dps = this.packageJson[type]
        if (!this.packageJson[type]) {
            return res
        }
        res.push(...Object.keys(dps))
        return res
    }

}

class ModuleCache {

    constructor() {
        this._cache = {}
    }

    /**
     * Найти модуль по имени
     * @return ошибка, если модуль не найден
     */
    getModule(name) {
        let m = this._cache[name]
        if (m) {
            return m
        }
        let mp = moduleUtils.getModulePath(name)
        m = new ModuleCacheItem(name, mp)
        this._cache[name] = m
        return m
    }

}

class ModuleHolder {

    constructor() {
        this._used = {}
        this._items = []
    }

    /**
     * Список элементов
     * @return {ModuleCacheItem[]}
     */
    getItems() {
        return this._items
    }

    /**
     * Список имен
     * @return {String[]}
     */
    getNames() {
        return this.getItems().map(it => it.name)
    }

    addModule(name) {
        if (name in this._used) {
            return
        }
        console.info("--- ADD",name);
        this._used[name] = true
        let m = moduleCache.getModule(name)
        console.info("for module:",name);
        let deps = m.getDependNames("dependencies")
        console.info("   deps",   deps);
        for (let dep of deps) {
            this.addModule(dep)
        }
        console.info("END module:",name);

        this._items.unshift(m)
    }

}

let moduleCache = new ModuleCache()

module.exports = {
    moduleCache,
    ModuleHolder,
}
