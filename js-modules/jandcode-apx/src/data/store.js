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
                    this.__records = data.data
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
     * Данные словарей
     * @type {Dictdata}
     */
    getDictdata() {
        return this.__dictdata
    }

}