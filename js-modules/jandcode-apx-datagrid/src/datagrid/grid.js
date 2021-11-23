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
            if (apx.jcBase.isArray(col.columns)) {
                if (!leaf) {
                    res.push(col)
                }
                step(col.columns)
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
        this.options = Object.assign({}, options)
        let opts = this.options

        if (opts.data) {
            throw new Error('Для datagrid данные нужно передавать в свойстве store')
        }

        // делаем все опции свойствами
        Object.assign(this, opts)

        // данные, могут быть массивом или {records:[],dictdata:{}}
        if (opts.store instanceof apx.Store) {
            this.store = opts.store
        } else {
            this.store = new apx.Store(opts.store)
        }

        // колонки
        this.columns = createDatagridColumns(opts.columns)
        this.__columnsById = {}
        let columns = expandColumns(this.columns, false)
        for (let col of columns) {
            this.__columnsById[col.colId] = col
        }
        this.__columnsFlat = expandColumns(this.columns, true)

        // сколько столбцов закреплено
        this.pinnedColumns = opts.pinnedColumns || 0

        this.rowHeight = opts.rowHeight || '1line'
        this.headerHeight = opts.headerHeight || '1line'
        this.multiSelect = opts.multiSelect

        this.eventBus = mitt()

        for (let evName of events) {
            let hName = 'on' + apx.vueUtils.capitalize(evName)
            let h = opts[hName]
            if (h) {
                this.eventBus.on(evName, h)
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
        if (this.eventBus != null) {
            this.eventBus.all.clear()
            this.eventBus = null
        }
        if (apx.jcBase.isArray(this.columns)) {
            for (let col of this.columns) {
                col.destroy()
            }
            this.columns = null
            this.__columnsById = null
            this.__columnsFlat = null
        }
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
     * Все колонки нижнего уровня, т.е. без групп
     */
    getColumnsFlat() {
        return this.__columnsFlat
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
