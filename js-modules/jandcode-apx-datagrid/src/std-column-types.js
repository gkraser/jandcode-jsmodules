import {apx} from './vendor'

let {h} = apx.Vue

/**
 * Дата
 */
export let date = {
    align: 'right',
    onDisplayValue: function(cell) {
        return apx.date.toDisplayStr(cell.value)
    }
}

