import {apx} from '../vendor'

let {jcBase} = apx

/**
 * Определить тип значения
 * @param v значение
 * @return {string} тип поля или null, если значение не определено
 */
function detectType(v) {
    if (v == null) {
        return null
    }
    if (jcBase.isNumber(v)) {
        return 'number'
    } else if (jcBase.isString(v)) {
        if (v.length === 10 && v.charAt(4) === '-' && v.charAt(7) === '-') {
            return 'date'
        } else {
            return 'string'
        }
    } else {
        return 'unknown'
    }
}

/**
 * Класс для представления данных, экспортируемых из диаграммы
 */
export class ExportDataset {

    constructor() {
        // данные, массив записей
        this.__data = []
        // информация о полях
        this.__fields = []
        this.__fieldsByName = {}
        // автотипы, для null-полей значение null, для остальных - строка с типом
        this.__detectedType = {}
        // default fields info
        this.__fieldInfoDefault = {}
    }

    /**
     * Данные. Массив записей.
     */
    getData() {
        return this.__data
    }

    /**
     * Добавить записи из массива записей
     * @param data
     */
    addData(data) {
        if (!apx.jcBase.isArray(data)) {
            return
        }
        for (let rec of data) {
            let z = Object.assign({}, rec)
            this.__data.push(z)
            this.__detectTypes(z)
        }
    }

    /**
     * Объеденить с данными
     * @param data массив записей
     * @param keyField ключевое поле. Должно быть и в текущих данных и в добавляемых.
     */
    joinData(data, keyField) {
        if (!apx.jcBase.isArray(data)) {
            return
        }
        // индексируем текущие данные
        let curIdx = {}
        for (let rec of this.__data) {
            let key = rec[keyField]
            if (!key) {
                continue
            }
            curIdx[key] = rec
        }
        // добавляем
        for (let rec of data) {
            let key = rec[keyField]
            if (!key) {
                continue
            }
            let z = Object.assign({}, rec)
            let curRec = curIdx[key]
            if (curRec == null) {
                curRec = {}
                curRec[keyField] = key
                this.__data.push(curRec)
            }
            Object.assign(curRec, z)
            this.__detectTypes(z)
        }

    }

    /**
     * Добавить описание поля.
     * @param opt
     */
    addFieldInfo(opt) {
        let fn = opt.name
        if (!fn) {
            return
        }
        let f = this.__fieldsByName[fn]
        if (f == null) {
            f = {name: fn}
            this.__fieldsByName[fn] = f
            this.__fields.push(f)
        }
        Object.assign(f, opt)
    }

    /**
     * Установить информацию о полях по умолчанию.
     * Если поле имеется и для него информации не назначено явно,
     * то она будет братся отсюда.
     * Можно вызывать несколько раз.
     *
     * @param opt ключ - имя поля, значение - объект с информацией
     */
    setFieldInfoDefault(opt) {
        jcBase.extend(true, this.__fieldInfoDefault, opt)
    }

    /**
     * Описание всех полей
     * @return {Object[]}
     */
    getFields() {
        let res = []
        let used = {}

        // явные
        for (let f of this.__fields) {
            used[f.name] = true
            let z = Object.assign({}, f)
            if (this.__fieldInfoDefault[f.name]) {
                Object.assign(z, this.__fieldInfoDefault[f.name])
            }
            if (z.ignore) {
                continue
            }
            res.push(z)
        }

        // остаток
        for (let fn in this.__detectedType) {
            if (used[fn]) {
                continue
            }
            let z = {name: fn}
            if (this.__fieldInfoDefault[z.name]) {
                Object.assign(z, this.__fieldInfoDefault[z.name])
            }
            res.push(z)
        }

        // постобработка
        for (let f of res) {
            if (!f.title) {
                f.title = f.name
            }
            if (!f.type) {
                if (this.__detectedType[f.name]) {
                    f.type = this.__detectedType[f.name]
                } else {
                    f.type = 'unknown'
                }
            }
        }

        return res
    }

    ////// private

    /**
     * Попытка автоматом определить тип поля
     */
    __detectTypes(rec) {
        for (let fn in rec) {
            if (!this.__detectedType[fn]) {
                let v = rec[fn]
                this.__detectedType[fn] = detectType(v)
            }
        }
    }

}
