import {Store} from './store'
import {jcBase, Vue} from '../vendor'
import {BaseState} from './state'

let {reactive} = Vue

function getCountPages(store, limit) {
    if (!limit || limit <= 0) {
        return 1
    }
    let total = jcBase.toInt(store.state.paginate.total)
    if (total === 0) {
        return 1
    }
    let pages = Math.trunc(total / limit)
    if (total % limit > 0) {
        pages++
    }
    return pages
}

function getCurPage(store, offset, limit) {
    if (offset < 0) {
        offset = 0
    }
    if (!limit || limit <= 0) {
        return 1
    }
    let page = Math.trunc(offset / limit)
    page = page + 1
    return page
}

function getOffset(pageNum, limit) {
    if (pageNum <= 0) {
        return 0
    }
    return (pageNum - 1) * limit
}

/**
 * Загрузчик store
 */
export class StoreLoader extends BaseState {

    constructor(options) {
        super()

        // опции конструктора
        this.options = Object.assign({}, options)
        let opts = Object.assign({}, this.options)

        // по умолчанию - собственное store
        this.__store = new Store()

        // параметры загрузчика, это не параметры dao!
        this.__params = Object.assign({}, opts.params)
        delete opts.params

        // пагинация
        this.__offset = 0
        this.__limit = opts.limit || 0
        delete opts.limit

        // присваиваем все
        Object.assign(this, opts)

        //
        this.updateState()
    }

    grabState() {
        let state = super.grabState();
        jcBase.mergeDeep(state, this.store.state)
        jcBase.mergeDeep(state, {
            params: this.params,
            countPages: getCountPages(this.store, this.limit),
            curPage: getCurPage(this.store, this.offset, this.limit),
        })
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
     * Загрузить указанную страницу, если разрешена пагинация.
     * Если пагинация не разрешена, грузит все.
     *
     * @param pageNum номер страницы (с 1)
     * @return {Promise<void>}
     */
    async loadPage(pageNum) {
        this.__offset = getOffset(pageNum, this.limit)
        await this.load()
    }

    /**
     * Связанное Store
     * @return {Store}
     */
    get store() {
        return this.__store
    }

    /**
     * Параметры загрузчика. На основании их отрабатывает load
     * @return {Object}
     */
    get params() {
        return this.__params
    }

    /**
     * Установить новые параметры. Параметры накладываются на существующие.
     * Осуществляется неглубокое копирование.
     *
     * @param {Object} params значения параметров
     */
    updateParams(params) {
        Object.assign(this.__params, params)
    }

    ////// paginate

    get offset() {
        return this.__offset
    }

    get limit() {
        return this.__limit
    }

    updateLimit(value) {
        this.__limit = value || 0
        this.__offset = 0
    }

}

