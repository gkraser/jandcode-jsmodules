/*

cfg

Глобальная конфигурация

Глобальная переменная Jc_cfg содержит конфигурацию по умолчанию.

----------------------------------------------------------------------------- */

import globalNs from './globalNs'
import * as base from './base'
import * as cnv from './cnv'


function copyCfgObject(ob) {
    let tmp = Object.assign({}, ob)
    escapeCfgProps(tmp)
    return tmp
}

function escapeCfgProps(ob) {
    delete ob['set']
    delete ob['setDefault']
    delete ob['__values']
    delete ob['__valuesDefault']
}

/**
 * Конфигурация
 */
class Cfg {

    constructor() {
        this.__values = {}
        this.__valuesDefault = {}
    }

    /**
     * Установить свойства конфигурации с помощью объекта.
     * Осуществляется глубокое копирование.
     * @param cfg {Object}
     */
    set(cfg) {
        if (!cfg) {
            return;
        }
        if (!cnv.isObject(cfg)) {
            throw new Error('Cfg.set: need object')
        }
        base.mergeDeep(this.__values, copyCfgObject(cfg))
        base.mergeDeep(this, this.__valuesDefault, this.__values)
    }

    /**
     * Установить свойства конфигурации по умолчанию с помощью объекта.
     * Осуществляется глубокое копирование.
     * Если свойства уже есть, они не перезаписываются.
     * @param cfg {Object}
     */
    setDefault(cfg) {
        if (!cfg) {
            return;
        }
        if (!cnv.isObject(cfg)) {
            throw new Error('Cfg.set: need object')
        }
        base.mergeDeep(this.__valuesDefault, copyCfgObject(cfg))
        base.mergeDeep(this, this.__valuesDefault, this.__values)
    }

}

/**
 * Глобальный экземпляр конфигурации
 */
let cfg = new Cfg()


// базовая конфигурация по умолчанию
cfg.set({

    /**
     * Базовый url для добавления в начало загружаемых url. Должен заканчиваться '/'
     */
    baseUrl: '/',

    /**
     * Среда выполнения dev/prod
     */
    envDev: process.env.NODE_ENV !== 'production',

    /**
     * Среда выполнения source/bin
     */
    envSource: false,  //todo а нужно ли на клиенте envSource теперь?

    /**
     * Среда исполнения тестов.
     */
    envTest: false,

})

// забираем что уже есть и делаем себя глобальной
cfg.set(global['Jc_cfg'])
globalNs.cfg = cfg

export default cfg;

export {
    Cfg
}
