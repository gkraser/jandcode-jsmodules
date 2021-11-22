import {apx} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    let daoApi = apx.jcBase.jsonrpc.createJsonRpcClient({url: '_tst/tst-api'})

    it("small", async function() {
        let st = await daoApi.invoke('store/small', [])
        console.info("small", st);
    })

    it("custom", async function() {
        let st = await daoApi.invoke('store/custom', [20, 20])
        console.info("custom", st);
    })

})

