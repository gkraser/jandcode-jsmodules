<template>
    <tst-panel>
        <template #tools>
            <tst-checkbox label="change color" v-model="color"/>
            <tst-btn label="hideAllTooltip over pause"
                     @click="hideAllTooltipPause(2000)"/>
        </template>
        <tst-multi-panels>
            <jc-chart :options="plainOptions" :key="color"></jc-chart>
        </tst-multi-panels>
        <tst-multi-panels cfgKey="k1">
            <jc-chart :options="chart2" :key="color"></jc-chart>
        </tst-multi-panels>
    </tst-panel>
</template>

<script>
import {apxChart} from '../vendor'
import chart1 from './_charts/chart1'
import Chart2 from './_charts/chart2'

export default {
    created() {
        this.plainOptions = chart1({color: this.color})
        this.chart2 = new Chart2({color: this.color})
    },
    data() {
        return {
            color: false,
        }
    },
    watch: {
        color() {
            this.plainOptions = chart1({color: this.color})
            this.chart2.updateParams({color: this.color})
        }
    },
    methods: {
        hideAllTooltipPause(pause) {
            console.info("start timer", pause);
            setTimeout(() => {
                console.info("HIDE!");
                apxChart.hideAllTooltip()
            }, pause)
        }
    }
}
</script>