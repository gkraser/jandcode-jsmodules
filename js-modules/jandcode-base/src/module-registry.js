/* Реестр динамических модулей для webpack

----------------------------------------------------------------------------- */

import * as cnv from './cnv'

let _registry = {}

/**
 * Регистрирует модуль
 * @param name произвольное имя, под которым будет доступен модуль
 * @param fnPromise функция, которая возвращает Promise, которая должна вернуть модуль
 * @param moduleInfo опциональный объект с произвольной информацией об модуле
 */
export function addModule(name, fnPromise, moduleInfo = null) {
    if (!name) {
        throw new Error("name not defined")
    }
    if (!cnv.isFunction(fnPromise)) {
        throw new Error("fnPromise is not function")
    }
    let mi = Object.assign({}, moduleInfo)
    mi.name = name
    mi.fnPromise = fnPromise
    _registry[name] = mi
}

/**
 * Загружает указанный модуль
 * @param name имя модуля
 * @return {Promise}
 */
export async function loadModule(name) {
    let mi = _registry[name]
    if (!mi) {
        throw new Error(`module ${name} not found`)
    }
    let mod = mi.fnPromise()
    //
    if (!(mod instanceof Promise)) {
        throw new Error(`module ${name} is registered with a function that does not return a Promise`)
    }
    //
    return mod
}

/**
 * Информация обо всех зарегистрированный модулях
 * @return {Object[]}
 */
export function getModuleInfos() {
    return Object.values(_registry)
}
