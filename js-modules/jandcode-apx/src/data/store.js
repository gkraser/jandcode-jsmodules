import {jcBase} from '../vendor'
import {Dictdata} from './dictdata'

/**
 * store - табличные данные
 */
export class Store {

    constructor(data) {
        this.__records = []
        this.__dictdata = new Dictdata()

        if (data) {
            if (jcBase.isArray(data)) {
                this.__records = data
            } else {
                // это объект
                if (jcBase.isArray(data.data)) {
                    throw new Error('Для store записи нужно передавать в поле records')
                }
                if (jcBase.isArray(data.records)) {
                    this.__records = data.records
                }
                if (data.dictdata) {
                    if (data.dictdata instanceof Dictdata) {
                        this.__dictdata = data.dictdata
                    } else {
                        this.__dictdata.updateData(data.dictdata)
                    }
                }
            }
        }
    }

    /**
     * Строки данных.
     * @return {[Object]}
     */
    getRecords() {
        return this.__records
    }

    /**
     * Установить новый вариант набора записей для store
     * @param records
     */
    setRecords(records) {
        if (!jcBase.isArray(records)) {
            records = []
        }
        this.__records = records
    }

    /**
     * Данные словарей
     * @type {Dictdata}
     */
    getDictdata() {
        return this.__dictdata
    }

}