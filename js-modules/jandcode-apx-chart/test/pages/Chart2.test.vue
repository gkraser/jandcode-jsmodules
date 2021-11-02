<template>
    <tst-panel>
        <template #tools>
            <tst-checkbox label="color" v-model="color"/>
        </template>
        <tst-multi-panels>
            <jc-chart :options="options" :key="color"></jc-chart>
        </tst-multi-panels>
        <tst-multi-panels cfgKey="k1">
            <jc-chart :options="options" :key="color"></jc-chart>
        </tst-multi-panels>
    </tst-panel>
</template>

<script>
import '../vendor'
import Chart2 from './chart2'

export default {
    created() {
        this.options = new Chart2({color: this.color})
    },
    data() {
        return {
            color: false,
            //tag: false,
        }
    },
    watch: {
        color(newVal) {
            this.options.updateParams({color: this.color})
        }
    },
    methods: {}
}
</script>