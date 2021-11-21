import {apx} from '../vendor'
import {DatagridColumn} from './column'
import {DatagridDriver} from './driver'
import mitt from 'mitt'

/**
 * По описанию columns в опциях datagrid создает массив объектов DaragridColumn
 * @param columns описания колонок
 */
function createDatagridColumns(columns) {
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
 * Получить раскрытый список колонок из массива объектов DatagridColumn
 * @param {[DatagridColumn]} columns колонки
 * @param leaf true - только листья, группы пропускаем, false - все, включая группы
 */
function expandColumns(columns, leaf) {
    let res = []
    let step = (columns) => {
        for (let col of columns) {
            if (apx.jcBase.isArray(col.getColumns())) {
                if (!leaf) {
                    res.push(col)
                }
                step(col.getColumns())
            } else {
                res.push(col)
            }
        }
    }
    step(columns)
    return res
}

let events = ['rowSelect', 'clickCell']

/**
 * Грида. Абстрактный класс, который предоставляет интерфейс для настройки и работы
 * реальной гриды.
 */
export class Datagrid {

    /**
     * @param options {API.datagrid_options}
     */
    constructor(options) {
        // опции, переданные при создании объекта
        this.__options = Object.assign({}, options)
        let opts = this.__options

        // данные, могут быть массивом или {data:[],dictdata:{}}
        this.__store = new apx.Store(opts.data)

        // колонки
        this.__columns = createDatagridColumns(opts.columns)
        this.__columnsById = {}
        let columns = expandColumns(this.__columns, false)
        for (let col of columns) {
            this.__columnsById[col.getColId()] = col
        }
        this.__columnsFlat = expandColumns(this.__columns, true)

        // сколько столбцов закреплено
        this.__pinnedColumns = opts.pinnedColumns || 0

        this.__rowHeight = opts.rowHeight
        this.__headerHeight = opts.headerHeight

        this.__eventBus = mitt()

        for (let evName of events) {
            let hName = 'on' + apx.vueUtils.capitalize(evName)
            let h = opts[hName]
            if (h) {
                this.__eventBus.on(evName, h)
            }
        }

        this.setDriver(new DatagridDriver())

    }

    /**
     * Деструктор
     */
    destroy() {
        if (this.__driver != null) {
            this.__driver.destroy()
            this.__driver = null
        }
        if (this.__eventBus != null) {
            this.__eventBus.all.clear()
            this.__eventBus = null
        }
        if (apx.jcBase.isArray(this.__columns)) {
            for (let col of this.__columns) {
                col.destroy()
            }
            this.__columns = null
            this.__columnsById = null
            this.__columnsFlat = null
        }
    }

    getOptions() {
        return this.__options
    }

    getEventBus() {
        return this.__eventBus
    }

    getDriver() {
        return this.__driver
    }

    setDriver(driver) {
        if (this.__driver != null) {
            this.__driver.destroy()
        }
        this.__driver = driver
        this.__driver.init(this)
    }

    /**
     * Получить колонку по id
     */
    getColumnById(colId) {
        return this.__columnsById[colId]
    }

    /**
     * Все колонки, как они были переданы в опции гриды при ее создании
     */
    getColumns() {
        return this.__columns
    }

    /**
     * Все колонки нижнего уровня, т.е. без групп
     */
    getColumnsFlat() {
        return this.__columnsFlat
    }

    /**
     * Данные для гриды
     * @return {apx.Store}
     */
    getStore() {
        return this.__store
    }

    /**
     * Сколько колонок закреплено
     */
    getPinnedColumns() {
        return this.__pinnedColumns
    }

    /**
     * Высота строки
     */
    getRowHeight() {
        return this.__rowHeight || '1line'
    }

    /**
     * Высота строки заголовка
     */
    getHeaderHeight() {
        return this.__headerHeight || '1line'
    }

    ///

    /**
     * Экспортировать данные из текущего состояния гриды
     * @param options параметры экспорта
     */
    exportData(options) {
        return this.getDriver().exportData(options)
    }

}
