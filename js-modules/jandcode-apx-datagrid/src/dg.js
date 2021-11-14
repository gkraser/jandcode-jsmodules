/* Абстрактный универсальный интерфейс описания datagrid
----------------------------------------------------------------------------- */

import {apx} from './vendor'


let API = {

    /**
     * Параметр для обработчиков, которые работают с ячейкой
     */
    cell: {
        value: Object,
        data: Object,
        rowIndex: Number,
        column: 'DatagridColumn',
        datagrid: 'Datagrid',
        event: 'DomEvent',
    },

    rows: {
        datagrid: 'Datagrid',
        rowIndexes: Array
    },

    /**
     * Функция для получения html для ячейки.
     * @param cell для какой ячейки (см {@link API.cell})
     * @return {VNode} виртуальная vue-node
     */
    onCellRender: function(cell) {},

    /**
     * Обработчик события: изменились выделенные строки
     * @param ev информация о выделенных строках (см {@link API.rows})
     */
    onRowSelect: function(ev) {},

    /**
     * Обработчик события: click по ячейке
     * @param ev информация о ячейке (см {@link API.cell})
     */
    onCellClick: function(ev) {},

}


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

        // данные, могут быть массивом или {data:[],dictdata:{}}
        this.data = new DatagridData(opts.data)

        //
        this.__columnsById = {}
        let columns = this.__getFlatColumns(false)
        for (let col of columns) {
            this.__columnsById[col.colId] = col
        }
        this.__columns = this.__getFlatColumns(true)

        // событие: изменились выделенные строки
        this.onRowSelect = opts.onRowSelect

        // событие: click по ячейке
        this.onCellClick = opts.onCellClick

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

    /**
     * Все колонки, группы исключены
     */
    getColumns() {
        return this.__columns
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

        // функция для получения содержимого ячейки
        this.onCellRender = opts.onCellRender

        // событие: click по ячейке
        this.onCellClick = opts.onCellClick
    }

}

/**
 * Данные гриды
 */
export class DatagridData {

    constructor(data) {
        this.__rows = []
        this.__dictdata = {}

        if (data) {
            if (apx.jcBase.isArray(data)) {
                this.__rows = data
            } else {
                // это объект
                if (apx.jcBase.isArray(data.data)) {
                    this.__rows = data.data
                }
                if (data.dictdata) {
                    this.__dictdata = data.dictdata
                }
            }
        }
    }

    /**
     * Строки данных. Каждая строка - объект.
     */
    getRows() {
        return this.__rows
    }

    /**
     * Строка номер rowNum.
     * Возвращает данные для указанной строки.
     */
    getRow(rowNum) {
        return this.__rows[rowNum] || {}
    }

    /**
     * Данные словарей
     */
    getDictdata() {
        return this.__dictdata
    }

}

