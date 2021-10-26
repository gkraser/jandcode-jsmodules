/*

    Конфигурация с автоматической записью в localStore

    Сама конфигурация хранится в свойстве cfg.

    При загрузке load() будут доступны только те свойства, которые были явно
    объявлены через applyDefaut. Остальные - будут проигнорированы.


 */

import {jcBase, Vue} from '../vendor'
import lodashGet from 'lodash/get'
import lodashSet from 'lodash/set'

let {reactive, watch} = Vue

/**
 * Глубокое копирование
 * @param {Object} to куда
 * @param {Object} from откуда
 * @param {boolean} override true - заменять значения свойств, иначе если свойство уже есть,
 *                  оно игнорируется
 * @param {boolean} createProp true - создавать свойства, если их нет в to,
 *                  иначе - игнорировать
 */
function deepCopy(to, from, override, createProp) {
    for (let name in from) {
        let value = from[name]
        if (!(name in to)) {
            if (createProp) {
                if (jcBase.isObject(value)) {
                    to[name] = {}
                    deepCopy(to[name], value, override, createProp)
                } else {
                    to[name] = value
                }
            }
        } else {
            let curValue = to[name]
            if (jcBase.isObject(curValue) && jcBase.isObject(value)) {
                deepCopy(curValue, value, override, createProp)
            } else if (!jcBase.isObject(curValue) && !jcBase.isObject(value)) {
                if (override) {
                    to[name] = value
                }
            } else {
                throw new Error("Не совместимость типов свойств " + name)
            }
        }
    }
}

/**
 * Хранлище конфигурации, которое может читать/писать данные из localStorage.
 */
export class CfgStore {

    constructor() {

        /**
         * Конфигурация
         */
        this.cfg = reactive({})

        /**
         * Ключ этой конфигурации для записи в localStore
         * @type {string}
         */
        this.configKey = module.id

        /**
         * Записывать ли конфигурацию в localStore автоматически при изменении
         * @type {boolean}
         */
        this.autoSave = false

        //
        this.__cfgDefault = {}
        this.__cfgLoaded = {}

        this.__unwatch = watch(this.cfg, () => {
            if (this.autoSave) {
                this.save()
            }
        }, {
            deep: true
        })
    }

    destroy() {
        this.__unwatch()
    }

    applyDefault(obj) {
        deepCopy(this.__cfgDefault, obj, true, true)
        deepCopy(this.cfg, obj, false, true)
        deepCopy(this.cfg, this.__cfgLoaded, true, false)
    }

    reset(path) {
        if (!path) {
            this.__cfgLoaded = {}
            deepCopy(this.cfg, this.__cfgDefault, true, true)
        } else {
            let subDefault = lodashGet(this.__cfgDefault, path)
            if (subDefault === undefined) {
                return // нет значения по умолчанию, путь не правильный?
            }
            if (!jcBase.isObject(subDefault)) {
                // это просто значение, берем из default, т.к. в cfg оно уже точно есть
                lodashSet(this.cfg, path, subDefault)
                return
            }
            let subCfg = lodashGet(this.cfg, path)
            if (subCfg === undefined) {
                return // нет значения, что то не то...
            }
            if (!jcBase.isObject(subCfg)) {
                return // это не объект
            }
            lodashSet(this.__cfgLoaded, path, {})
            deepCopy(subCfg, subDefault, true, true)
        }
    }

    save() {
        let tmp = {}
        deepCopy(tmp, this.cfg, true, true)
        window.localStorage.setItem(this.configKey, JSON.stringify(tmp))
    }

    load() {
        let s = window.localStorage.getItem(this.configKey)
        if (s) {
            try {
                this.__cfgLoaded = JSON.parse(s)
                if (!jcBase.isObject(this.__cfgLoaded)) {
                    this.__cfgLoaded = {}
                }
            } catch(e) {
                this.__cfgLoaded = {}
            }
        } else {
            this.__cfgLoaded = {}
        }
        deepCopy(this.cfg, this.__cfgLoaded, true, false)
    }

}

/**
 * @return {CfgStore}
 */
export function createCfgStore(configKey) {
    let inst = new CfgStore()
    if (configKey) {
        inst.configKey = configKey
    }
    return inst
}


