/* Утилиты для модулей.

Эти утилиты не полностью универсальны. Граничные случаи обрабатываются так,
как выгодно инструментам для webpack или jandcode.

----------------------------------------------------------------------------- */
let path = require('path')
let fs = require('fs')
let globby = require('globby')

/**
 * Информация о модуле
 */
class ModuleInfo {

    constructor() {
        /**
         * Имя модуля
         */
        this.name = ""
        /**
         * Путь до корня модуля
         * @type String
         */
        this.path = null
        /**
         * Существует ли модуль
         */
        this.exists = false
        /**
         * Содержимое package.json
         * @type Object
         */
        this.packageJson = {}
    }

    /**
     * Список имен зависимостей из package.json из раздела type
     * @param {String|String[]} type раздел с зависимостями, например: dependencies, devDependencies.
     * По умолчанию - ['devDependencies', 'dependencies']
     */
    getDependNames(type) {
        if (!type) {
            type = ['devDependencies', 'dependencies']
        }
        if (!Array.isArray(type)) {
            type = [type]
        }

        let tmp = {}
        for (let t of type) {
            let dps = this.packageJson[t]
            if (dps) {
                Object.assign(tmp, dps)
            }
        }

        return Object.keys(tmp)
    }

}

/**
 * Кешш модулей
 */
class ModuleCache {

    constructor() {
        this._cache = {}
        this._byPathCache = {}
    }

    /**
     * Найти модуль по имени.
     * Если модуль не существует физически, он все равно возвращается.
     * В этом случае его свойство exists=false.
     */
    getModuleByName(moduleName) {
        let m = this._cache[moduleName]
        if (m) {
            return m
        }
        m = createModuleInfoByName(moduleName)
        this._cache[moduleName] = m
        return m
    }

    /**
     * Найти модуль, которому принадлежт указанный путь
     * @param file
     * @return {ModuleInfo} null, если не удалось определить
     */
    getModuleByPath(file) {
        file = path.resolve(file)
        if (file in this._byPathCache) {
            return this._byPathCache[file]
        }
        let pjf = findUp("package.json", file)
        if (pjf === null) {
            let m = new ModuleInfo()
            this._byPathCache[file] = m
            return m
        }
        let m = createModuleInfoByPackageJsonFile(pjf)
        this._byPathCache[file] = m
        this._byPathCache[pjf] = m
        this._byPathCache[m.path] = m
        this._cache[m.name] = m
        return m
    }
}

class ModuleDependsExpander {

    constructor() {
        /**
         * Найденные модули. Сначала идут зависимые.
         * @type {ModuleInfo[]}
         */
        this.modules = []

        /**
         * Какие зависимости использовать.
         * По умолчанию - ['devDependencies', 'dependencies']
         * @type {Array}
         */
        this.dependType = ['devDependencies', 'dependencies']

        /**
         * Фильтр. На вход - ModuleInfo. Если вернет false, то этот модуль
         * и его зависимости будут исключены.
         * @type {Function}
         */
        this.fnFilter = null

        this._used = {}
    }

    /**
     * Добавить модуль
     * @param name имя модуля
     */
    addModule(name) {
        if (name in this._used) {
            return
        }
        this._used[name] = true
        let m = moduleCache.getModuleByName(name)

        if (!m.exists) {
            return
        }

        if (this.fnFilter) {
            if (this.fnFilter(m) === false) {
                return
            }
        }

        let deps = m.getDependNames(this.dependType)
        for (let dep of deps) {
            this.addModule(dep)
        }

        this.modules.push(m)
    }

}

///////////////////////////////////////////////////////////////////////////////////////

let moduleCache = new ModuleCache()


/**
 * Загрузить json
 */
function loadJson(fn) {
    let rawdata = fs.readFileSync(fn)
    return JSON.parse(rawdata);
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
 * По имени модуля возвращает корневой каталог модуля.
 * Если модуль не найден - ошибка.
 * @param {String} moduleName
 */
function getModulePath(moduleName) {
    let pjf = require.resolve(moduleName + "/package.json")
    return path.dirname(pjf)
}

/**
 * Создать ModuleInfo по имени модуля
 * @param moduleName
 * @return {ModuleInfo}
 */
function createModuleInfoByName(moduleName) {
    let inst = new ModuleInfo()
    inst.name = moduleName
    try {
        inst.path = path.resolve(getModulePath(moduleName))
        inst.exists = true
    } catch(e) {
        // ignore
    }
    if (inst.exists) {
        try {
            inst.packageJson = loadJson(path.resolve(inst.path, "package.json"))
        } catch(e) {
            inst.packageJson = {}
        }
    }
    return inst
}

/**
 * Создать ModuleInfo по файлу package.json
 * @param packageJsonFile файл package.json
 * @return {ModuleInfo}
 */
function createModuleInfoByPackageJsonFile(packageJsonFile) {
    let inst = new ModuleInfo()

    packageJsonFile = path.resolve(packageJsonFile)
    if (fs.existsSync(packageJsonFile)) {
        inst.path = path.dirname(packageJsonFile)
    } else {
        return new ModuleInfo()
    }

    try {
        inst.packageJson = loadJson(packageJsonFile)
        inst.name = inst.packageJson.name
        if (!inst.name) {
            inst.name = path.basename(inst.path)
        }
        inst.exists = true
    } catch(e) {
        // ignore
    }
    return inst
}

function normSlash(s) {
    if (!s) {
        return s
    }
    return s.replace(/\\/g, '/')
}

///////////////////////////////////////////////////////////////////////////////////////

/**
 * По имени модуля или абсолютновму пути в модуле возвращает информацию по нему
 * @param moduleNameOrPath
 * @return {ModuleInfo}
 */
function getModule(moduleNameOrPath) {
    if (path.isAbsolute(moduleNameOrPath)) {
        return moduleCache.getModuleByPath(moduleNameOrPath)
    } else {
        return moduleCache.getModuleByName(moduleNameOrPath)
    }
}

/**
 * По имени модуля возвращает информацию по нему
 * @param moduleName
 * @return {ModuleInfo}
 */
function getModuleByName(moduleName) {
    return moduleCache.getModuleByName(moduleName)
}

/**
 * Найти модуль, которому принадлежт указанный путь
 * @param path
 * @return {ModuleInfo}
 */
function getModuleByPath(path) {
    return moduleCache.getModuleByPath(path)
}

/**
 * Для модуля по маске возвращает список файлов в нем
 * @param module имя модуля или путь внетри модуля
 * @param masks маски относительно корня модуля. Может быть массивом или строкой.
 *              Используется модуль globby.
 * @return {*} список абсолютных путей
 */
function getModuleFiles(module, masks) {
    if (!Array.isArray(masks)) {
        masks = [masks]
    }
    let mod = getModule(module)
    if (!mod.exists) {
        return []
    }
    return globby.sync(masks, {cwd: mod.path, absolute: true})
}

/**
 * Раскрыть зависимости
 * @param opts {Object}
 * @param {Array} opts.modules для каких модулей (имена или пути)
 * @param {Function} opts.fnFilter функция фильтр. На входе ModuleInfo. Если возвращает false,
 *        то модуль исключается из зависимостей
 * @param {Function} opts.dev включать ли dev-зависимости. По умолчанию - true
 * @param {Function} opts.dev включать ли prod-зависимости. По умолчанию - true
 * @return {ModuleInfo[]}
 */
function expandModuleDepends(opts) {
    let {
        modules,
        fnFilter,
        dev = true,
        prod = true,
    } = opts

    if (!modules) {
        return []
    }
    if (!Array.isArray(modules)) {
        modules = [modules]
    }
    let exp = new ModuleDependsExpander()
    if (fnFilter) {
        exp.fnFilter = fnFilter
    }
    exp.dependType = []
    if (dev) {
        exp.dependType.push('devDependencies')
    }
    if (prod) {
        exp.dependType.push('dependencies')
    }
    for (let m of modules) {
        let mod = getModule(m)
        exp.addModule(mod.name)
    }
    return exp.modules
}

/**
 * По имени файла возвращает имя, привязанного к имени модуля, где он находится.
 * Например для файла /home/ws/node_modules/@my/pak/src/file.js
 * вернет @my/pak/src/file.js
 *
 * @param file имя файла
 * @return имя модуля или null, если не удалось определить
 */
function fileToModule(file) {
    file = path.resolve(file)
    let mod = getModuleByPath(file)
    if (!mod.exists) {
        return null
    }
    let relpath = normSlash(path.relative(mod.path, file))
    let res = mod.name
    if (relpath) {
        res = res + '/' + relpath
    }
    return res
}


module.exports = {
    normSlash,
    getModule,
    getModuleByName,
    getModuleByPath,
    getModuleFiles,
    expandModuleDepends,
    fileToModule,
}
