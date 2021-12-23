import {Store} from './store'

//todo не закончено, не применяется, внедрить такой или похожий механизм в jsonrpc

/**
 * Кеш для store.
 *
 */
export class CacheStore {

    constructor() {
        this.__cache = {}
        this.__handlers = {}
    }

    /**
     * Получить загруженное store по параметрам
     * @param name имя обработчика
     * @param params параметры получаемого store, зависят от обработчика
     */
    async getStore(name, params) {
        let handler = this.__handlers[name]
        if (!handler) {
            throw new Error(`Обработчик ${name} не найден`)
        }
        params = Object.assign({}, params)
        let key = handler.makeKey(params)
        let cacheItem = this.__cache[key]
        if (!cacheItem) {
            let store = await handler.load(params)
            if (!(store instanceof Store)) {
                let paramsStr = params
                try {
                    paramsStr = JSON.stringify(params)
                } catch(ignore) {
                }
                throw new Error(`Обработчик ${name} не вернул store для параметров ${paramsStr}`)
            }
            cacheItem = {
                store: store,
                name: name,
                params: params,
                key: key,
            }
            this.__cache[key] = cacheItem
        }
        //
        let resStore = cacheItem.store.cloneStore()
        return resStore
    }

    /**
     * Зарегистрировать обработчик store
     * @param name имя обработчика
     * @param options опции конструктора
     */
    registerHanlder(name, options) {
        let handler = new CacheStoreHandler(name, options)
        this.__handlers[name] = handler
    }

}

/**
 * Обработчик загрузчика store
 */
export class CacheStoreHandler {

    constructor(name, options) {
        /**
         * Имя обработчика
         * @type String
         */
        this.name = name

        /**
         * Опции конструктора
         * @type {Object}
         */
        this.options = Object.assign({}, options)
        let opts = Object.assign({}, this.options)

        // все опции делаем свойствами
        Object.assign(this, opts)
    }

    /**
     * Ключ кеша для указанных параметров
     * @param params параметры, переданные в {@link CacheStore.getStore}
     * @return {String}
     */
    makeKey(params) {
        return this.name
    }

    /**
     * Загрузить store по указанным параметрам
     * @param params параметры, переданные в {@link CacheStore.getStore}
     * @return {Store}
     */
    async load(params) {
        return null
    }

}