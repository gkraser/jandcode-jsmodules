import {jcBase} from '../vendor'

let defaultFields = ['text', 'name']

/**
 * Хранилище словарных данных.
 * Хранит данные вида: {dictName:{id:{field1:value, ...}}}
 */
export class Dictdata {

    constructor() {
        this.__data = {}
    }

    /**
     * Обновить данные
     * @param dictName имя словаря
     * @param {Array[Object]} data данные словаря в виде массива строк
     */
    updateDict(dictName, data) {
        for (let row of data) {
            let id = row['id']
            if (id == null) {
                continue
            }
            let dictIdData = this.__getDictId(dictName, id, true)
            this.__assignValues(dictIdData, row)
        }
    }

    /**
     * Обновить данные из другого dictdata
     * @param dictdata данные в виде {dictName:{id:{field1:value, ...}}}
     */
    updateData(dictdata) {
        jcBase.mergeDeep(this.__data, dictdata)
    }

    /**
     * Данные в виде {dictName:{id:{field1:value, ...}}}
     * @return {*|{}}
     */
    getData() {
        return this.__data
    }

    /**
     * Значения для указанного словаря и его id
     * @param dictName имя словаря
     * @param id id из словаря
     * @return {*} {}, если нет такого id или словаря
     */
    getValues(dictName, id) {
        let d = this.__getDictId(dictName, id)
        if (d == null) {
            d = {}
        }
        return d
    }

    /**
     * Значение для указанного словаря и его id
     * @param dictName имя словаря
     * @param id id из словаря
     * @param fieldName имя поля из словаря, чье значение нужно. Если не указано,
     * то последовательно пытаемся взять поля text, name. Если нет таких полей - то первое
     * попавшееся.
     * @return {*} пустая строка, если нет словаря, id или поля
     */
    getValue(dictName, id, fieldName = '') {
        let d = this.__getDictId(dictName, id)
        if (d == null) {
            return ''
        }
        if (!fieldName) {
            // из полей по умолчанию
            for (let fn of defaultFields) {
                let v = d[fn]
                if (v != null) {
                    return v
                }
            }
            // первое попавшееся
            for (let fn in d) {
                let v = d[fn]
                if (v != null) {
                    return v
                }
            }
            // ничего не нашли
            return ''
        } else {
            let v = d[fieldName]
            if (v == null) {
                return ''
            }
            return v
        }
    }

    ////// private

    __getDict(dictName, createIfNotExist) {
        let d = this.__data[dictName]
        if (!d && createIfNotExist) {
            d = {}
            this.__data[dictName] = d
        }
        return d
    }

    __getDictId(dictName, id, createIfNotExist) {
        let idStr = '' + id
        let dict = this.__getDict(dictName, createIfNotExist)
        if (dict == null) {
            return null
        }
        let k = dict[idStr]
        if (!k && createIfNotExist) {
            k = {}
            dict[idStr] = k
        }
        return k
    }

    __assignValues(dictIdData, rowData) {
        for (let fn in rowData) {
            if (fn === 'id') {
                continue
            }
            dictIdData[fn] = rowData[fn]
        }
    }

}