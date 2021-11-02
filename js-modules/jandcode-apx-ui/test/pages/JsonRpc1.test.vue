<template>
    <tst-panel>
        <div class="q-gutter-x-md">
            <jc-btn label="dao.invoke []" @click="invokePos"/>
            <jc-btn label="dao.invoke {}" @click="invokeNamed"/>
        </div>
    </tst-panel>
</template>

<script>
import {apx} from '../vendor'

export default {
    created() {
        this.daoApi = new apx.jcBase.jsonrpc.JsonRpcClient({url: '_tst/tst-api'})
    },
    methods: {
        async invokePos() {
            let res1 = await this.daoApi.invoke("simple/noParams", [])
            console.info("res1", res1);
            let res2 = await this.daoApi.invoke("simple/params2", ['pp1', 2])
            console.info("res2", res2);
        },
        async invokeNamed() {
            // лишние параметры просто игнорируются
            let res1 = await this.daoApi.invoke("simple/noParams", {
                any: 1, p1: 'pp11', p2: 22
            })
            console.info("res1", res1);
            let res2 = await this.daoApi.invoke("simple/params2", {
                any: 2, p1: 'pp11', p2: 22
            })
            console.info("res", res2);
        }
    }
}
</script>
