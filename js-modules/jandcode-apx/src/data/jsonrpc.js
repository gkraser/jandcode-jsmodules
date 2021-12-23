/* Связь с dao api сервера на jandcode-core2
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'
import {Store} from './store'

/**
 * Json Rpc клиент для выполнения запросов к api, предоставленному модулем
 * jandcode-core-apx.
 */
export class ApxJsonRpcClient extends jcBase.jsonrpc.JsonRpcClient {

    constructor(options) {
        super(options)
    }

    /**
     * Выполняет {@link ApxJsonRpcClient.invoke} и возвращает результат в виде Store.
     *
     * @param methodName
     * @param methodParams
     * @return {Store}
     */
    async loadStore(methodName, methodParams) {
        let res = await this.invoke(methodName, methodParams)
        return new Store(res)
    }

    /**
     * Выполняет {@link ApxJsonRpcClient.invoke} и возвращает результат в виде StoreRecord.
     * Считает, что dao возвращает store. Из этого store берется первая запись.
     *
     * @param methodName
     * @param methodParams
     * @return {StoreRecord}
     */
    async loadStoreRecord(methodName, methodParams) {
        let res = await this.invoke(methodName, methodParams)
        let store = new Store(res)
        return store.getRecord(0)
    }

    /**
     * Выполняет {@link ApxJsonRpcClient.invoke} и возвращает результат в виде Store.
     *
     * Если для этого метода разрешено кеширование, то возможно вернет кешиованный
     * экземпляр.
     *
     * @param methodName
     * @param methodParams
     * @return {Store}
     */
    async getStore(methodName, methodParams) {
        return this.loadStore(methodName, methodParams)
    }

    /**
     * Выполняет {@link ApxJsonRpcClient.invoke} и возвращает результат в виде StoreRecord.
     * Считает, что dao возвращает store. Из этого store берется первая запись.
     *
     * Если для этого метода разрешено кеширование, то возможно вернет кешиованный
     * экземпляр.
     *
     * @param methodName
     * @param methodParams
     * @return {StoreRecord}
     */
    async getStoreRecord(methodName, methodParams) {
        return this.loadStoreRecord(methodName, methodParams)
    }

}

