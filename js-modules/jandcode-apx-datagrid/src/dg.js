/* Абстрактный универсальный интерфейс описания datagrid
----------------------------------------------------------------------------- */

import {apx} from './vendor'

let API_cell = {
    value: Object,
    data: Object,
    rowIndex: Number,
    column: 'DatagridColumn',
    datagrid: 'Datagrid',
}

/**
 * Функция для получения html для ячейки.
 * @param cell для какой ячейки (см {@link API_cell})
 * @return {VNode} виртуальная vue-node
 */
function API_cellRender(cell) {}


//////

let _columnTypes = {}

/**
 * Зарегистрировать тип колонки
 * @param name имя типа
 * @param colDef определение колонки
 */
export function registerColumnType(name, colDef) {
    _columnTypes[name] = colDef
}

export function getColumnTypes() {
    return _columnTypes
}

//////

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

        //
        this.__columnsById = {}
        let columns = this.__getFlatColumns(false)
        for (let col of columns) {
            this.__columnsById[col.colId] = col
        }

    }

    /**
     * Деструктор
     */
    destroy() {
    }

    /**
     * Получить колонку по id
     */
    getColumnById(colId) {
        return this.__columnsById[colId]
    }

    ////// private

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
     * Получить список колонок
     * @param leaf true - только листья, группы пропускаем
     */
    __getFlatColumns(leaf) {
        let res = []
        let step = (columns) => {
            for (let col of columns) {
                if (col.columns != null) {
                    if (!leaf) {
                        res.push(col)
                    }
                    step(col.columns)
                } else {
                    res.push(col)
                }
            }
        }
        step(this.columns)
        return res
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

        // тип поля, забираем все, что в типе определено
        this.type = null
        if (opts.type) {
            let type = _columnTypes[opts.type]
            if (!type) {
                console.warn("Not found columnt type", opts.type, "for", this.options);
            }
            this.type = opts.type
            Object.assign(opts, type)
        }

        // имя поля из данных
        this.field = opts.field || 'no-field'

        // заголовок колонки
        this.title = opts.title || this.field

        // выравнивание ячейки: left/right
        this.align = opts.align || 'left'

        // id колонки
        this.colId = opts.colId || apx.jcBase.nextId('col-')

        // дочерние колонки, тогда эта колонка - группа
        this.columns = null
        if (apx.jcBase.isArray(opts.columns)) {
            this.columns = []
            for (let col of opts.columns) {
                this.columns.push(new DatagridColumn(col))
            }
        }

        // функция API_cellRender для получения содержимого ячейки
        this.cellRender = opts.cellRender

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

