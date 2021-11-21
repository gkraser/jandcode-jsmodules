import {apx} from '../vendor'

/**
 * Данные гриды
 */
export class DatagridData {

    constructor(data) {
        this.__rows = []
        this.__dictdata = new apx.Dictdata()

        if (data) {
            if (apx.jcBase.isArray(data)) {
                this.__rows = data
            } else {
                // это объект
                if (apx.jcBase.isArray(data.data)) {
                    this.__rows = data.data
                }
                if (data.dictdata) {
                    if (data.dictdata instanceof apx.Dictdata) {
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
     * @type {apx.Dictdata}
     */
    getDictdata() {
        return this.__dictdata
    }

}

