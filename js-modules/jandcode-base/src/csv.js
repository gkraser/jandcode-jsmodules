/* Утилиты для csv
----------------------------------------------------------------------------- */


let regex_quote = /"/g
let regex_newline = /\n/g

/**
 * Построитель csv
 */
export class CsvBuilder {

    constructor(options) {
        this.__rows = []
    }

    /**
     * Добавить строку из массива
     * @param row массив
     */
    appendRowArray(row) {
        let r = []
        for (let v of row) {
            v = v.replace(regex_quote, '""')
            v = v.replace(regex_newline, ' ')
            r.push('"' + v + '"')
        }
        this.__rows.push(r.join(','))
    }

    build() {
        return this.__rows.join('\n')
    }

}