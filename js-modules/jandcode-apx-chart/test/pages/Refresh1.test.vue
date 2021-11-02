<template>
    <tst-panel>
        <template #tools>
            <tst-checkbox label="red" v-model="red"/>
        </template>
        <tst-multi-panels>
            <jc-chart :options="options" :key="red"></jc-chart>
        </tst-multi-panels>
        <tst-multi-panels cfgKey="k1">
            <jc-chart :options="options" :key="red"></jc-chart>
        </tst-multi-panels>
    </tst-panel>
</template>

<script>
import '../vendor'
import chart1 from './chart1'

export default {
    created() {
        this.options = chart1()
    },
    data() {
        return {
            red: false,
        }
    },
    watch: {
        red() {
            this.options = chart1({color: this.red ? 'red' : null})
        }
    },
    methods: {}
}
</script>