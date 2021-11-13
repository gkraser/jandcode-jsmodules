/* Абстрактный универсальный интерфейс описания datagrid
----------------------------------------------------------------------------- */

import {apx} from './vendor'

/**
 * Грида. Абстрактный класс, который предоставляет интерфейс для настройки и работы
 * реальной гриды.
 */
export class Datagrid {

    constructor(options) {
        // опции, переданные при создании объекта
        this.options = Object.assign({}, options)
        let opts = this.options

        // колонки
        this.columns = this.__createColumns(opts.columns)

        // данные
        this.data = this.__createData(opts.data)
    }

    __createColumns(columns) {
        let res = []
        if (!columns) {
            return res
        }
        for (let col of columns) {
            let z = new DatagridColumn(col)
            res.push(z)
        }
        return res
    }

    __createData(data) {
        let res = null
        if (apx.jcBase.isArray(data)) {
            res = new DatagridData({data: data})
        } else {
            res = new DatagridData({data: []})
        }
        return res
    }

    /**
     * Деструктор
     */
    destroy() {
    }

}

/**
 * Колонка гриды
 */
export class DatagridColumn {

    constructor(options) {
        // опции, переданные при создании объекта
        this.options = Object.assign({}, options)
        let opts = this.options

        // имя поля из данных
        this.field = opts.field || 'no-field'

        // заголовок колонки
        this.title = opts.title || this.field

        // выравнивание ячейки: left/right
        this.align = opts.align || 'left'

        // id колонки
        this.colId = opts.colId || apx.jcBase.nextId('col-')

    }

}

/**
 * Данные гриды
 */
export class DatagridData {

    constructor(options) {
        // опции, переданные при создании объекта
        this.options = Object.assign({}, options)
        let opts = this.options

        //
        this.data = opts.data
    }

    /**
     * Данные в виде массива записей
     */
    getData() {
        return this.data
    }

    /**
     * Количество строк
     */
    getSize() {
        if (!this.data) {
            return 0
        }
        return this.data.length
    }

    /**
     * Строка номер rowNum.
     * Возвращает данные для указанной строки.
     */
    getRow(rowNum) {
        if (!this.data) {
            return {}
        }
        return this.data[rowNum] || {}
    }

}

