import {tst, apx} from '../vendor'

import CellSimple1 from '../_components/CellSimple1'
import CellComplex1 from '../_components/CellComplex1'

let {h} = apx.Vue


/**
 * @param options.countRows сколько строк
 */
function data1(options) {
    let opts = Object.assign({
        countRows: 5,
    }, options)
    let ut = new tst.RndUtils(opts.countRows * 1000)

    //
    let res = {
        data: [],
        dictadata: {}
    }

    for (let i = 1; i <= opts.countRows; i++) {
        let z = {
            id: i,
            label: 'label-' + i,
        }
        res.data.push(z)
    }

    return res
}

/**
 * @param opt.countRows сколько записей
 */
export default function(options) {
    let opts = Object.assign({}, options)

    let cols = [
        {
            title: "ID",
            field: "id",
        },
        {
            title: "Label",
            field: "label",
            onRenderCell: function(cell) {
                return cell.vue(CellSimple1, {
                    text: cell.displayValue, text2: cell.data.id
                })
            }
        },
        {
            title: "Label2",
            field: "label",
            onRenderCell: function(cell) {
                return '!' + cell.value
            }
        },
        {
            title: "Label",
            field: "label",
            width: 280,
            minMidth: 280,
            onRenderCell: function(cell) {
                return cell.vue(CellComplex1, {
                    text: cell.displayValue + "!", text2: cell.data.id
                })
            }
        },
    ]

    let res = {
        data: data1(opts),
        columns: cols,

        rowHeight: '2.2em',
    }

    return res
}

