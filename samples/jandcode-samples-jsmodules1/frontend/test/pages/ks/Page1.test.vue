<template>
    <tst-panel fontsize debug-bg>
        <template #tools>
            <tst-btn label="change1" @click="click1"/>
            <tst-fontsize/>
            <tst-checkbox label="useColor" v-model="cfg.useColor"/>
        </template>

        <div class="row q-gutter-x-md">
            <Dash1 prop1="1" ref="z1" :class="class1"/>
            <Dash1 prop1="2" big/>
        </div>

    </tst-panel>
</template>

<script>
import {apx, tst} from '../vendor'

import Dash1 from './_components/Dash1'

import data1 from './_data/data1'


export default {
    mixins: [tst.mixins.cfgStore],

    components: {
        Dash1
    },
    created() {
        this.cfgStore.applyDefault({
            useColor: false,
        })
        this.data2 = data1
    },
    data() {
        return {
            class1: null,
            data1: data1
        }
    },
    methods: {
        click1() {
            //this.$refs.z1.
        },
        applyCfg() {
            if (this.cfg.useColor) {
                this.class1 = 'text-red'
            } else {
                this.class1 = null
            }
        }
    }
}
</script>

<style lang="less">
.debug-bg {

    .dash1 {
        background-color: #b4b480;
    }

}
</style>