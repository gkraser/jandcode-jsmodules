import {apx} from '../vendor'

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
     * Строки данных.
     * @return {[Object]}
     */
    getRows() {
        return this.__rows
    }

    /**
     * Данные строки номер rowNum.
     */
    getRow(rowNum) {
        return this.__rows[rowNum]
    }

    /**
     * Данные словарей
     */
    getDictdata() {
        return this.__dictdata
    }

}

