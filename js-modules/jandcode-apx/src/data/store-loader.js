import {Store} from './store'
import {jcBase} from '../vendor'

/**
 * Загрузчик store
 */
export class StoreLoader {

    constructor(options) {
        // опции конструктора
        this.options = Object.assign({}, options)

        // по умолчанию - собственное store
        this.store = new Store()

        // присваиваем все
        Object.assign(this, this.options)
    }

    /**
     * Метод должен загрузить данные store в соответствии с текущими
     * свойствами StoreLoader.
     *
     * @return {Object} новые данные для store
     */
    async onLoad() {
        return {
            records: []
        }
    }

    /**
     * Загрузка данных в store
     */
    async load() {
        let storeData = await this.onLoad()

        if (!jcBase.isObject(storeData)) {
            throw new Error("Данные для store должны быть объектом")
        }

        // присваиваем все в store
        Object.assign(this.store, storeData)
    }

}

