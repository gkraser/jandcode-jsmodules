/* Базовые функции и объекты
----------------------------------------------------------------------------- */

import {jQuery} from "./vendor"
import lodashMerge from 'lodash/merge'

// счетчик для nextId
let _nextId_cnt = 0

// префикс по умолчанию для nextId
let _nextId_defaultPrefix = 'jc-'

/**
 * Генерация следующего уникального id.
 * @param prefix префикс id. По умолчанию 'jc-'
 * @return {String} id
 */
export function nextId(prefix) {
    _nextId_cnt++;
    if (!prefix) prefix = _nextId_defaultPrefix;
    return '' + prefix + _nextId_cnt;
}

/**
 * Рекурсивное объедиенени объектов src в dest.
 * @return {Object} dest с наложенными рекурсивно свойствами из srs
 */
export function mergeDeep(dest, ...src) {
    return lodashMerge(dest, ...src)
}

/**
 * Синоним для jQuery.ready
 */
export function ready(callback) {
    jQuery(callback)
}

