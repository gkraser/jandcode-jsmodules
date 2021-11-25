import {Store} from './store'
import {jcBase, Vue} from '../vendor'
import {BaseState} from './state'

let {reactive} = Vue

/**
 * Загрузчик store
 */
export class StoreLoader extends BaseState {

    constructor(options) {
        super()

        // опции конструктора
        this.options = Object.assign({}, options)

        // по умолчанию - собственное store
        this.__store = new Store()

        // присваиваем все
        Object.assign(this, this.options)

        //
        this.updateState()
    }

    grabState() {
        let state = super.grabState();
        jcBase.mergeDeep(state, this.store.state)
        return state
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

        // обновляем состояние
        this.store.updateState()
        this.updateState()
    }

    /**
     * Связанное Store
     * @return {Store}
     */
    get store() {
        return this.__store
    }

}

