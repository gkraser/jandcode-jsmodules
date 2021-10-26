<template>
    <div>
        value1: {{ cfg.value1 }}
        <input type="text" v-model="cfg.value1"/>
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
        return {}
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg
            //console.info("applyCfg for", cfg);
        },
    }
}
</script>
