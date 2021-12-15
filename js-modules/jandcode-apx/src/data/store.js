import {jcBase, Vue} from '../vendor'
import {Dictdata} from './dictdata'
import {BaseState} from './state'

/**
 * store - табличные данные
 */
export class Store extends BaseState {

    constructor(data) {
        super()

        this.__records = []
        this.__recordsById = null
        this.__dictdata = new Dictdata()
        this.__paginate = {
            offset: 0,
            limit: 0,
            total: 0,
        }

        if (data) {
            if (jcBase.isArray(data)) {
                this.__records = data
            } else {
                // это объект
                if (jcBase.isArray(data.data)) {
                    throw new Error('Для store записи нужно передавать в поле records')
                }

                // присваиваем все
                Object.assign(this, data)
            }
        }

        // обновляем состояние
        this.touchStateMarker('records_change')
        this.updateState()
    }

    grabState() {
        let state = super.grabState();
        jcBase.mergeDeep(state, {
            countRecords: this.records.length,
            paginate: this.paginate,
        })
        return state
    }

    /**
     * Строки данных.
     * @return {[Object]}
     */
    get records() {
        return this.__records
    }

    /**
     * Установить новый вариант набора записей для store
     * @param records
     */
    set records(records) {
        if (!jcBase.isArray(records)) {
            records = []
        }
        this.__records = records
        this.__recordsById = null
        this.touchStateMarker('records_change')
    }

    /**
     * Данные словарей
     * @type {Dictdata}
     */
    get dictdata() {
        return this.__dictdata
    }

    /**
     * Установить/обновить данные словарей
     */
    set dictdata(value) {
        if (value) {
            this.__dictdata.updateData(value)
        }
    }

    /**
     * Информация о пагинации
     * @return {*|{total: number, offset: number, limit: number}}
     */
    get paginate() {
        return this.__paginate
    }

    set paginate(value) {
        Object.assign(this.__paginate, value)
    }

    //////

    __getRecordsById() {
        if (!this.__recordsById) {
            let res = {}
            for (let rec of this.__records) {
                let key = '' + rec.id
                res[key] = rec
            }
            this.__recordsById = res
        }
        return this.__recordsById
    }

    /**
     * Возвращает запись по id
     * @param id значение поля id
     * @return {Object}
     */
    findById(id) {
        let key = '' + id
        return this.__getRecordsById()[key]
    }

}