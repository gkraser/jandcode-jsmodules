<template>
    <div>
        <div>
            <input type="text" v-model="cfg.value1"/>
            value1: <b>{{ cfg.value1 }}</b>
            value2: <b>{{ value2 }}</b>
        </div>
        <div>
            <button @click="cfgStore.reset()">reset</button>
        </div>
    </div>
</template>

<script>
import {tst} from './vendor'

export default {
    mixins: [
        tst.mixins.cfgStore,
    ],
    created() {
        this.cfgStore.applyDefault({
            value1: 'value1',
        })
    },
    data() {
        return {
            value2: '',
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg
            this.value2 = '[' + cfg.value1 + ']'
        },
    }
}
</script>
