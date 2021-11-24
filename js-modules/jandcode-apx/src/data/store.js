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

                // присваиваем все
                Object.assign(this, data)
            }
        }
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

}