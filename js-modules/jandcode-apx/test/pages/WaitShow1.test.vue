<template>
    <div class="showwait1-test-c1445eb9">

        <div class="q-mb-md">
            <q-btn label="request1" @click="request1"/>
            собственный вложенный waitShow, ошибка в процессе
        </div>

        <div class="q-mb-md">
            <q-btn label="request2" @click="request2"/>
            2 запроса подряд, без ошибки
        </div>

        <div class="q-mb-md">
            <q-btn label="request3" @click="request3"/>
            2 запроса подряд, второй с ошибкой
        </div>

    </div>
</template>

<script>
import {apx} from '../vendor'

let act = '/jc/jandcode/core/apx/tst/actions/json1-pause.json'

export default {
    methods: {
        async request1() {

            apx.jcBase.waitShow()
            try {
                let res1 = await apx.jcBase.ajax.request({
                    url: act,
                    params: {
                        cnt: 2,
                        pause: 1000,
                        error: false
                    }
                })

                apx.jcBase.waitShow()
                try {
                    await apx.jcBase.ajax.request({
                        url: act,
                        params: {
                            cnt: 2,
                            pause: 1000,
                            error: true
                        }
                    })
                } finally {
                    apx.jcBase.waitHide()
                }
                console.info("res1", res1);

            } finally {
                apx.jcBase.waitHide()
            }
        },

        async request2() {

            let res1 = await apx.jcBase.ajax.request({
                url: act,
                params: {
                    cnt: 2,
                    pause: 2000,
                    error: false
                }
            })

            await apx.jcBase.ajax.request({
                url: act,
                params: {
                    cnt: 2,
                    pause: 2000,
                    // error: true
                }
            })

            console.info("res1", res1);

        },

        async request3() {

            let res1 = await apx.jcBase.ajax.request({
                url: act,
                params: {
                    cnt: 2,
                    pause: 2000,
                    error: false
                }
            })

            await apx.jcBase.ajax.request({
                url: act,
                params: {
                    cnt: 2,
                    pause: 2000,
                    error: true
                }
            })

            console.info("res1", res1);

        }
    }
}
</script>
