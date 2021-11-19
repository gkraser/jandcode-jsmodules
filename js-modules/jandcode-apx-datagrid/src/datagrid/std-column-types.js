import {apx} from '../vendor'

let {h} = apx.Vue

/**
 * Дата
 */
export let date = {
    align: 'right',
    width: '10char',
    onDisplayValue: function(cell) {
        return apx.date.toDisplayStr(cell.value)
    }
}

/**
 * Число
 */
export let number = {
    align: 'right',
}

/**
 * Строка
 */
export let string = {
}

/**
 * Неизвестный тип
 */
export let unknown = {
}


