import {apx} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    let daoApi = new apx.ApxJsonRpcClient({url: '_tst/tst-api'})

    it("small", async function() {
        let st = await daoApi.invoke('store/small', [])
        console.info("small", st);
    })

    it("custom", async function() {
        let st = await daoApi.invoke('store/custom', [{
            countRecords: 20, countFields: 20
        }])
        console.info("custom", st);
    })

    it("assign", async function() {
        let st = await daoApi.invoke('store/small', [])
        let st2 = new apx.Store()
        Object.assign(st2, st)
        console.info("data", st);
        console.info("new store", st2);
    })

    it("paginate", async function() {
        let st = await daoApi.invoke('store/customPaginate', {
            config: {
                countRecords: 100, countFields: 1
            },
            filter: {
                // text1: 'q'
            },
            paginate: {
                offset: 15,
                limit: 3
            }
        })
        console.info("paginate", st);
    })

})

