/* Дополнения для tools

Эти дополнения вводят различные модули

----------------------------------------------------------------------------- */

let path = require('path')
let fs = require('fs')
let lodashMerge = require('lodash/merge')

let moduleUtils = require('./module-utils')

let addonFile = 'jc-tools-addon.js'

/**
 * addon-ы для jc tools
 */
class JcToolsAddons {

    constructor(addons) {
        this.addons = addons
    }

    /**
     * Массив базовых webpack конфигураций, которые вводятся дополнениями.
     */
    getWebpackBaseConfigs() {
        return this.addons.map(v => v.webpackBaseConfig).filter(v => !!v)
    }

    /**
     * Темы. Объект вида:
     * {themeName: {name:themeName, module: themeModule}}
     */
    getThemes() {
        if (this._themes) {
            return this._themes
        }
        let res = {}
        for (let ad of this.addons) {
            if (ad.themes) {
                for (let th_name in ad.themes) {
                    let th_data = ad.themes[th_name]
                    let data = {name: th_name}
                    data = Object.assign(data, th_data)
                    if (!data.module) {
                        console.warn(`WARNING: for theme ${th_name} from ${ad.addonFile} not assigned module`)
                        continue
                    }
                    res[data.name] = data
                }
            }
        }
        this._themes = res
        return res
    }

    /**
     * Объединенная конфигурация
     */
    getConfig() {
        if (this._config) {
            return this._config
        }
        let res = {}
        for (let ad of this.addons) {
            if (ad.config) {
                lodashMerge(res, ad.config)
            }
        }
        this._config = res
        return res
    }
}

/**
 * Возвращает список addon, которые доступны для указанного модуля
 * @param forModule имя модели или путь внутри модуля
 */
function getAddons(forModule) {
    let mod = moduleUtils.getModuleByName(forModule)
    if (!mod.exists) {
        mod = moduleUtils.getModuleByPath(path.resolve(forModule))
    }
    if (!mod.exists) {
        return []
    }

    function filter(m) {
        if (m.path.indexOf('node_modules') !== -1) {
            if (!m.name.startsWith('@')) {
                return false
            }
        }
    }

    let mods = moduleUtils.expandModuleDepends({
        modules: mod.name,
        //fnFilter: filter,
        dev: false,
        prod: true,
    })

    let res = []

    for (let m of mods) {
        let af = path.resolve(m.path, addonFile)
        if (fs.existsSync(af)) {
            let mExp = require(af)
            let tmp = Object.assign({}, mExp)
            tmp.moduleName = m.name
            tmp.addonFile = af
            res.push(tmp)
        }
    }

    return new JcToolsAddons(res)
}

module.exports = {
    getAddons,
}