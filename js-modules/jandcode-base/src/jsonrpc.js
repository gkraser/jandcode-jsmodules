/* Json-Rpc
----------------------------------------------------------------------------- */

import Jc from './globalNs'
import * as base from './base'
import * as ajax from './ajax'
import * as error from './error'
import * as cnv from './cnv'

/**
 * Простой клиент Json-Rpc
 */
export class JsonRpcClient {

    constructor(options) {

        /**
         * url, где находится обработчик
         * @type {string}
         */
        this.url = 'unknown'

        base.extend(this, options)
    }

    /**
     * Вызвать метод json rpc
     * @param methodName имя метода
     * @param methodParams параметры. Может быть массивом или объектом.
     * Массив для позиционных параметров, объект для поименнованных.
     * @return {Promise}
     */
    invoke(methodName, methodParams) {
        if (arguments.length !== 2) {
            throw new Error('Не верное число агрументов')
        }
        if (!cnv.isArray(methodParams) && !cnv.isObject(methodParams)) {
            throw new Error('Параметры метода должны быть массивом или объектом')
        }
        let th = this
        let params = {}
        let id = base.nextId('json-rpc-')
        //
        if (Jc.cfg.envDev) {
            params._m = methodName.replace(/\//g, ':')
            console.group(`${id} [${th.url}] ${methodName}`)
            console.time("time")
            console.info(`params:`, methodParams)
        }
        //
        let promise = new Promise(function(resolve, reject) {
            ajax.request({
                url: th.url,
                params: params,
                data: {
                    id: id,
                    method: methodName,
                    params: methodParams,
                }
            }).then((resp) => {
                if (Jc.cfg.envDev) {
                    console.info(`result:`, resp.data)
                    console.timeEnd("time")
                    console.groupEnd()
                }
                resolve(resp.data.result)
            }).catch((resp) => {
                if (Jc.cfg.envDev) {
                    console.info(`ERROR result:`, resp.response.data)
                    console.timeEnd("time")
                    console.groupEnd()
                }
                let err = resp.response.data
                if (!cnv.isString(err)) {
                    if (err.error) {
                        err = err.error
                    }
                }
                reject(error.createError(err))
            })
        });

        // маркируем
        promise.jsonRpcId = id

        return promise
    }
}

/**
 * Создать клиента jsonrpc
 * @param options
 * @param {string} options.url где находится обработчик
 * @return {JsonRpcClient}
 */
export function createJsonRpcClient(options) {
    return new JsonRpcClient(options)
}
