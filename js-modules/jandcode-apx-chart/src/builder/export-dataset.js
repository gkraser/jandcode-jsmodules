/**
 * Класс для представления данных, экспортируемых из диаграммы
 */
export class ExportDataset {

    constructor() {
        // данные
        this.__data = []
        // известные поля, определеляется по данным
        this.__knownFields = null
        // информация о полях
        this.__fields = []
        this.__fieldsByName = {}
        // автотипы
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
     * Все известные поля. Определяется по данным.
     */
    __getKnownFields() {
        if (!this.__knownFields) {
            let idx = {}
            for (let rec of this.__data) {
                for (let fn in rec) {
                    if (!(fn in idx)) {
                        idx[fn] = true
                    }
                }
            }
            this.__knownFields = idx
        }
        return this.__knownFields
    }

    /**
     * Попытка автоматом определить тип поля
     */
    __detectTypes(rec) {
        for (let fn in rec) {
            if (!this.__detectedType[fn]) {
                let v = rec[fn]
                if (!v) {
                    continue
                }
                if (apx.jcBase.isNumber(v)) {
                    this.__detectedType[fn] = 'number'
                } else if (apx.jcBase.isString(v)) {
                    if (v.length === 10 && v.charAt(4) === '-' && v.charAt(7) === '-') {
                        this.__detectedType[fn] = 'date'
                    } else {
                        this.__detectedType[fn] = 'string'
                    }
                } else {
                    this.__detectedType[fn] = 'unknown'
                }
            }
        }
    }

    /**
     * Добавить записи из массива записей
     * @param data
     */
    addData(data) {
        if (!apx.jcBase.isArray(data)) {
            return
        }
        this.__knownFields = null
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
        this.__knownFields = null
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
            let z = Object.assign({}, rec)
            let key = z[keyField]
            if (!key) {
                continue
            }
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
        apx.jcBase.extend(true, this.__fieldInfoDefault, opt)
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
        for (let fn in this.__getKnownFields()) {
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
                }
            }
        }

        return res
    }
}
