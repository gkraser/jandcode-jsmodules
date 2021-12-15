/* Json-Rpc
----------------------------------------------------------------------------- */

import Jc from './globalNs'
import * as base from './base'
import * as ajax from './ajax'
import * as error from './error'
import * as cnv from './cnv'
import {fakeData} from './jsonrpc-fakedata'

export {fakeData} from './jsonrpc-fakedata'

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

        Object.assign(this, options)
    }

    /**
     * Вызвать метод json rpc
     * @param methodName имя метода
     * @param methodParams параметры. Может быть массивом или объектом.
     * Массив для позиционных параметров, объект для поименнованных.
     * @return {Promise}
     */
    async invoke(methodName, methodParams) {
        if (arguments.length !== 2) {
            throw new Error('Не верное число агрументов')
        }
        if (!cnv.isArray(methodParams) && !cnv.isObject(methodParams)) {
            throw new Error('Параметры метода должны быть массивом или объектом')
        }
        let id = base.nextId('json-rpc-')

        if (Jc.cfg.envDev) {
            // fake data 
            let fd = fakeData.get(this.url, methodName)
            if (fd) {
                let res = null
                console.group(`[FAKEDATA] ${id} [${this.url}] ${methodName}`)
                console.time("timeFake")
                console.info(`params:`, methodParams)
                try {
                    res = await fd.invokeFake(this, id, methodParams)
                } finally {
                    console.info(`result:`, res)
                    console.timeEnd("timeFake")
                    console.groupEnd()
                }
                return res
            }
        }

        return await this.__invokeReal(id, methodName, methodParams)
    }

    /**
     * Вызвать реальный метод json rpc
     */
    __invokeReal(id, methodName, methodParams) {
        let th = this
        let params = {}
        //
        if (Jc.cfg.envDev) {
            params._m = methodName.replace(/\//g, ':')
            console.group(`${id} [${th.url}] ${methodName}`)
            console.time("time")
            console.info(`params:`, methodParams)
        }
        //
        let promise = new Promise(function(resolve, reject) {
            let data = {
                id: id,
                method: methodName,
                params: methodParams,
            }

            // уведомляем
            th.onBeforeInvoke(data)

            ajax.request({
                url: th.url,
                params: params,
                data: data
            }).then((resp) => {
                try {
                    // уведомляем
                    th.onAfterInvoke(resp.data)
                } finally {
                    if (Jc.cfg.envDev) {
                        console.info(`result:`, resp.data.result)
                        console.info(`  resp:`, resp.data)
                        console.timeEnd("time")
                        console.groupEnd()
                    }
                }
                // готово
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

    /**
     * Метод вызывается перед выполнением invoke.
     * @param data данные запроса, полные, по спецификации json-rpc.
     */
    onBeforeInvoke(data) {
    }

    /**
     * Метод вызывается после получение результатов invoke.
     * @param data данные ответа, полные, по спецификации json-rpc.
     */
    onAfterInvoke(data) {
    }
}

