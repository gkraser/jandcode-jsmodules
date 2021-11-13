import {apx} from './vendor'

let {h} = apx.Vue

/**
 * Дата
 */
export let date = {
    align: 'right',
    cellRender: function(cell) {
        let v = cell.value
        let s = apx.date.toDisplayStr(v)
        return h('span', null, s)
    }
}

