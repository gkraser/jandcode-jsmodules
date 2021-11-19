import {apx} from '../vendor'
import mitt from 'mitt'

//////

let _columnTypes = {}

/**
 * Зарегистрировать тип колонки
 * @param name имя типа
 * @param colDef {API.column_options} опции для колонки по умолчанию
 */
export function registerColumnType(name, colDef) {
    _columnTypes[name] = colDef
}

/**
 * Возвращает все зарегистрированные типы колонок
 * @return {{name:API.column_options}}
 */
export function getColumnTypes() {
    return _columnTypes
}

//////

let events = ['clickCell']

/**
 * Колонка гриды
 */
export class DatagridColumn {

    constructor(options) {
        // опции, переданные при создании объекта
        this.__options = Object.assign({}, options)
        let opts = this.__options

        // тип поля, забираем все, что в типе определено
        this.__type = null
        if (opts.type) {
            let type = _columnTypes[opts.type]
            if (!type) {
                console.warn("Not found column type", opts.type, "for", opts);
            } else {
                this.__type = opts.type
                Object.assign(opts, type)
            }
        }

        // имя поля из данных
        this.__field = opts.field || ''

        // заголовок колонки
        this.__title = opts.title || ''

        // выравнивание ячейки: left/right
        this.__align = opts.align || 'left'

        // id колонки
        this.__colId = opts.colId || apx.jcBase.nextId('col-')

        this.__width = opts.width
        this.__minWidth = opts.minWidth
        this.__maxWidth = opts.maxWidth
        this.__wrapText = opts.wrapText

        // дочерние колонки, тогда эта колонка - группа
        this.__columns = null
        if (apx.jcBase.isArray(opts.columns)) {
            this.__columns = []
            for (let col of opts.columns) {
                this.__columns.push(new DatagridColumn(col))
            }
        }

        // функция для получения содержимого ячейки
        this.__onDisplayValue = opts.onDisplayValue

        // функция для получения содержимого ячейки
        this.__onRenderCell = opts.onRenderCell

        this.__eventBus = mitt()

        for (let evName of events) {
            let hName = 'on' + apx.vueUtils.capitalize(evName)
            let h = opts[hName]
            if (h) {
                this.__eventBus.on(evName, h)
            }
        }

    }

    destroy() {
        if (this.__eventBus != null) {
            this.__eventBus.all.clear()
            this.__eventBus = null
        }
        if (apx.jcBase.isArray(this.__columns)) {
            for (let col of this.__columns) {
                col.destroy()
            }
            this.__columns = null
        }
    }

    getOptions() {
        return this.__options
    }

    getEventBus() {
        return this.__eventBus
    }

    getField() {
        return this.__field
    }

    getTitle() {
        return this.__title
    }

    getAlign() {
        return this.__align
    }

    getColId() {
        return this.__colId
    }

    getWidth() {
        return this.__width
    }

    getMinWidth() {
        return this.__minWidth
    }

    getMaxWidth() {
        return this.__maxWidth
    }

    getWrapText() {
        return this.__wrapText
    }

    getColumns() {
        return this.__columns
    }

    //////

    /**
     * Отрендерить содержимое ячейки
     * @param cell ячейка (см. {@link API.cell})
     * @return {*} строка (не HTML!) или VNode, если нужен HTML
     */
    renderCell(cell) {
        if (this.__onRenderCell) {
            return this.__onRenderCell(cell)
        }
        return this.getDisplayValue(cell)
    }

    /**
     * Прлучить отображаемое значение для ячейки
     * @param cell ячейка (см. {@link API.cell})
     * @return {*} строка
     */
    getDisplayValue(cell) {
        if (this.__onDisplayValue) {
            return this.__onDisplayValue(cell)
        }
        if (cell.value == null) {
            return ''
        }
        return '' + cell.value
    }

}
