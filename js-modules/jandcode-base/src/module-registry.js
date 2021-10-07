/* Реестр динамических модулей для webpack

----------------------------------------------------------------------------- */

import * as cnv from './cnv'

let _registry = {}

/**
 * Регистрирует модуль
 * @param name произвольное имя, под которым будет доступен модуль
 * @param fnPromise функция, которая возвращает Promise, которая должна вернуть модуль
 */
export function addModule(name, fnPromise) {
    if (!name) {
        throw new Error("name not defined")
    }
    if (!cnv.isFunction(fnPromise)) {
        throw new Error("fnPromise is not function")
    }
    _registry[name] = fnPromise
}

/**
 * Загружает указанный модуль
 * @param name имя модуля
 * @return {Promise}
 */
export async function loadModule(name) {
    let fnPromise = _registry[name]
    if (!fnPromise) {
        throw new Error(`module ${name} not found`)
    }
    let mod = fnPromise()
    //
    if (!(mod instanceof Promise)) {
        throw new Error(`module ${name} is registered with a function that does not return a Promise`)
    }
    //
    return mod
}

/**
 * Имена всех зарегистрированных модулей
 * @return {string[]}
 */
export function getModuleNames() {
    return Object.keys(_registry)
}
