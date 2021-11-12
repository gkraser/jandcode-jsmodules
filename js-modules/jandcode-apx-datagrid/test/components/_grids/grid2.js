import {tst} from '../vendor'

let tabledata = [
    {id: 1, name: "Oli Bob", age: "12", col: "red", dob: ""},
    {id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982"},
    {id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982"},
    {id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980"},
    {id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999"},
];

let coldata = [
    {title: "Name", field: "name", width: 120},
    {title: "Age", field: "age", hozAlign: "left", __formatter: "progress"},
    {
        title: "Favourite Color", field: "col", widthGrow: 1,
        formatter: function(cell, formatterParams) {
            var value = cell.getValue();
            return `<span style='color:${value}; font-weight:bold;'>${value}</span>`;
        }

    },
    {
        title: "Date Of Birth", field: "dob", sorter: "date",
        hozAlign: "center"
    },
]

/**
 * @param opt.count сколько записей дополнительно
 * @param opt.countCols сколько блоков колонок
 */
export default function(opt) {

    let ut = new tst.RndUtils()

    opt = Object.assign({}, opt)
    let count = opt.count || 400
    let countCols = opt.countCols || 2

    let data = tabledata.slice()

    for (let i = 100; i < 100 + count; i++) {
        data.push({
            id: i,
            name: 'user-' + i,
            age: ut.rnd.integer({min: 1, max: 100}),
            col: ut.rnd.color()
        })
    }

    let cols = []
    for (let i = 1; i <= countCols; i++) {
        cols.push(...coldata)
    }

    let res = {
        data: data,
        selectable: 1,
        columns: cols,
    }

    return res
}

