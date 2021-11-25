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
        this.options = Object.assign({}, options)
        let opts = this.options

        // тип поля, забираем все, что в типе определено
        this.type = null
        if (opts.type) {
            let type = _columnTypes[opts.type]
            if (!type) {
                console.warn("Not found column type", opts.type, "for", opts);
            } else {
                this.type = opts.type
                Object.assign(opts, type)
            }
        }

        // делаем все опции свойствами
        Object.assign(this, opts)

        // имя поля из данных
        this.field = opts.field || ''

        // заголовок колонки
        this.title = opts.title || ''

        // выравнивание ячейки: left/right
        this.align = opts.align || 'left'

        // id колонки
        this.colId = opts.colId || apx.jcBase.nextId('col-')

        this.width = opts.width
        this.minWidth = opts.minWidth
        this.maxWidth = opts.maxWidth
        this.wrapText = opts.wrapText
        this.dict = opts.dict

        // дочерние колонки, тогда эта колонка - группа
        this.columns = null
        if (apx.jcBase.isArray(opts.columns)) {
            this.columns = []
            for (let col of opts.columns) {
                this.columns.push(new DatagridColumn(col))
            }
        }

        // функция для получения содержимого ячейки
        this.onDisplayValue = opts.onDisplayValue

        // функция для получения содержимого ячейки
        this.onRenderCell = opts.onRenderCell

        this.eventBus = mitt()

        for (let evName of events) {
            let hName = 'on' + apx.vueUtils.capitalize(evName)
            let h = opts[hName]
            if (h) {
                this.eventBus.on(evName, h)
            }
        }

    }

    destroy() {
        if (this.eventBus != null) {
            this.eventBus.all.clear()
            this.eventBus = null
        }
        if (apx.jcBase.isArray(this.columns)) {
            for (let col of this.columns) {
                col.destroy()
            }
            this.columns = null
        }
    }

    //////

    /**
     * Отрендерить содержимое ячейки
     * @param cell ячейка (см. {@link API.cell})
     * @return {*} строка (не HTML!) или VNode, если нужен HTML
     */
    renderCell(cell) {
        if (this.onRenderCell) {
            return this.onRenderCell(cell)
        }
        return this.getDisplayValue(cell)
    }

    /**
     * Прлучить отображаемое значение для ячейки
     * @param cell ячейка (см. {@link API.cell})
     * @return {*} строка
     */
    getDisplayValue(cell) {
        if (this.onDisplayValue) {
            return this.onDisplayValue(cell)
        }
        if (cell.value == null) {
            return ''
        }
        if (this.dict) {
            return '' + cell.store.dictdata.getValue(this.dict, cell.value, this.dictField)
        } else {
            return '' + cell.value
        }
    }

}
