/* fake data

Механизм подмены запросов к api JsonRpc.

Использование:

    jcBase.jsonrpc.fakeData.add({
        url: 'api',             // если не указано, то по умолчанию = 'api'

        method: 'dao/method',   // метод

        async handler(params) { // обработчик
            return {} // данные в формате реального dao
        },
    })

Опции для add - это параметры конструктора FakeDataItem.

В теле handler this указывает на экземпляр FakeDataItem.

Можно выполнить реальный запрос, который перекрыт:

    this.invokeReal(params)

----------------------------------------------------------------------------- */

import * as cnv from './cnv'

class FakeDataItem {

    constructor(options) {
        this.options = Object.assign({}, options)
        let opts = Object.assign({}, this.options)

        if (!opts.method) {
            throw new Error("method not assigned")
        }
        this.__method = opts.method
        delete opts.method

        if (!opts.url) {
            opts.url = 'api'
        }
        this.__url = opts.url
        delete opts.url

        this.__jsonRpcClient = null
        this.__idRequest = null

        Object.assign(this, opts)
    }

    get method() {
        return this.__method
    }

    get url() {
        return this.__url
    }

    /**
     * id запроса
     */
    get idRequest() {
        return this.__idRequest
    }

    /**
     * Какой jsonRpcClient выполняется
     * @return {null}
     */
    get jsonRpcClient() {
        if (!this.__jsonRpcClient) {
            throw new Error("jsonRpcClient not assigned")
        }
        return this.__jsonRpcClient
    }

    /**
     * Обработчик запроса. Необходимо предоставить его.
     * @param params параметры метода
     * @return {Object} результат, имитирующий результат реального запроса
     */
    async handler(params) {
        return {}
    }

    /**
     * Выполнить обработку. Вызывается из JsonRpcClient
     * @param jsonRpcClient кто вызвал
     * @param idRequest id запроса
     * @param methodParams параметры метода
     * @return {Object} результат из handler
     */
    async invokeFake(jsonRpcClient, idRequest, methodParams) {
        if (!cnv.isObject(methodParams)) {
            throw new Error('Параметры метода для invokeFake должны быть объектом')
        }
        let res = null
        this.__jsonRpcClient = jsonRpcClient
        this.__idRequest = idRequest
        try {
            res = this.handler(methodParams)
        } finally {
            this.__jsonRpcClient = null
            this.__idRequest = null
        }
        return res
    }

    /**
     * Выполнить реальный метод jsonRpc
     * @param methodParams параметры метода
     * @return {Promise<null>}
     */
    async invokeReal(methodParams) {
        return await this.jsonRpcClient.__invokeReal(this.idRequest, this.method, methodParams)
    }

}

class FakeDataHolder {

    constructor() {
        this.__items = {}
    }

    add(...items) {
        for (let options of items) {
            let item = new FakeDataItem(options)
            this.__items[this.makeKey(item.url, item.method)] = item
        }
    }

    makeKey(url, method) {
        return url + '|' + method
    }

    /**
     * @param url
     * @param method
     * @return {FakeDataItem}
     */
    get(url, method) {
        return this.__items[this.makeKey(url, method)]
    }

}

/**
 * Глобальный экземпляр {@link FakeDataHolder}.
 * @type {FakeDataHolder}
 */
export let fakeData = new FakeDataHolder()
