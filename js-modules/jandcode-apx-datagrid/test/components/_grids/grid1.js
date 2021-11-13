import {tst, apx} from '../vendor'

let tableData = [
    {id: 1, name: "Иван Петров", age: 12, color: "red", dt: "2001-11-30"},
    {id: 2, name: "Mary May", age: 1, color: "blue", dt: "1982-05-14"},
    {id: 3, name: "Christine Lobowski", age: 42, color: "green", dt: "1982-05-22"},
    {id: 4, name: "Brendon Philips", age: 125, color: "orange", dt: "1980-01-08"},
    {id: 5, name: "Margret Marmajuke", age: 16, color: "yellow", dt: "1999-01-31"},
];

let tableColumns = [
    {title: "ID", field: "id"},
    {title: "Имя", field: "name"},
    {title: "Возраст", field: "age", align: 'right'},
    {
        title: 'Группа', columns:
            [
                {title: "Цв", field: "color"},
                {title: "Дт", field: "dt"},
            ]
    },
    {title: "Цвет", field: "color"},
    {title: "Дата", field: "dt"},
]

/**
 * @param opt.countRows сколько записей
 * @param opt.countCols сколько блоков колонок
 */
export default function(opt) {
    console.time("generate grid1");
    let ut = new tst.RndUtils()

    opt = Object.assign({}, opt)

    let countRows = opt.countRows || 5
    let countCols = opt.countCols || 2


    // данные

    let startDate = '2021-11-11'
    let data = tableData.slice()
    for (let i = 100; i < 100 + countRows; i++) {
        data.push({
            id: i,
            name: ut.firstLastName() + ' ' + i,
            age: ut.rnd.integer({min: 1, max: 100}),
            color: ut.rnd.color(),
            dt: apx.date.subDays(startDate, ut.rnd.integer({min: 100, max: 1000})),
        })
    }

    let cols = []
    for (let i = 1; i <= countCols; i++) {
        for (let col of tableColumns) {
            let z = Object.assign({}, col)
            z.title = z.title + '-' + i
            cols.push(z)
        }
    }

    let res = {
        data: data,
        columns: cols,
    }

    console.timeEnd("generate grid1");

    return res
}

