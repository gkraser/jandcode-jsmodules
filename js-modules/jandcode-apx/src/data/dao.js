/* Связь с dao api сервера на jandcode-core2
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'

/**
 * Json Rpc клиент для выполнения запросов к api, предоставленному модулем
 * jandcode-core-apx.
 */
export class ApxJsonRpcClient extends jcBase.jsonrpc.JsonRpcClient {

    constructor(options) {
        super(options)
    }

    
}

