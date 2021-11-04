<template>
    <tst-panel debug-bg fontsize>

        <template #tools>
            <tst-btn label="tools1-1"/>
            <tst-btn label="tools1-2"/>
            <tst-checkbox label="teleport1" v-model="teleport1"/>
        </template>

        <teleport to="#tst-tools" v-if="teleport1">
            <tst-btn label="teleport-tools2-1"/>
            <tst-btn label="teleport-tools2-2"/>
        </teleport>

        <div>
            <input type="text" v-model="cfg.value1"/>
            value1: <b>{{ cfg.value1 }}</b>
            value2: <b>{{ value2 }}</b>
        </div>
        <div class="test1">
            <button @click="cfgStore.reset()">reset</button>
        </div>
        <div>
            <span style="font-size: 1rem;">example fontsize</span>
        </div>
    </tst-panel>
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
    mounted() {
        this.$nextTick(() => {
            this.teleport1 = true
        })
    },
    data() {
        return {
            value2: '',
            teleport1: false,
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

<style lang="less">
.debug-bg {
    .test1 {
        background-color: #C6E2A6 !important;
        color: black;
    }
}
</style>