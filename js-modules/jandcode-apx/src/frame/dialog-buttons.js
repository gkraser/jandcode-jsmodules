/* Кнопки для диалогов
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'

/**
 * Описания конкретных кнопок
 */
export let dialogButtons = {
    'ok': {label: 'Ок', cmd: 'ok'},
    'cancel': {label: 'Отмена', cmd: 'cancel', kind: 'danger'},
    'close': {label: 'Закрыть', cmd: 'cancel'},
    'yes': {label: 'Да', cmd: 'yes'},
    'no': {label: 'Нет', cmd: 'no'},
    'save': {label: 'Сохранить', cmd: 'ok'},
}

/**
 * Группы кнопок
 */
export let dialogButtonGroups = {
    'ok': ['ok'],
    'ok-cancel': ['ok', 'cancel'],
    'close': ['close'],
    'yn': ['yes', 'no'],
    'ync': ['yes', 'no', 'cancel'],
    'save': ['save', 'cancel'],
}

/**
 * Получение списка определения кнопок для диалога
 * @param buttons либо имя из dialogButtonGroups, либо массив имен кнопок из
 * dialogButtons, либо массив определений кнопок
 * @return {Array} массив определений кнопок вида [{label: 'Ок', cmd: 'ok'},..]
 */
export function getDialogButtons(buttons) {
    if (!buttons) {
        buttons = 'ok'
    }
    let bArray = buttons
    if (jcBase.isString(bArray)) {
        bArray = dialogButtonGroups[buttons]
        if (!bArray) {
            bArray = dialogButtonGroups['ok']
        }
    }
    let res = []
    for (let b of bArray) {
        if (jcBase.isString(b)) {
            b = dialogButtons[b]
            if (!b) {
                b = dialogButtons['close']
            }
        }
        let b1 = Object.assign({}, b)
        res.push(b1)
    }
    return res
}

