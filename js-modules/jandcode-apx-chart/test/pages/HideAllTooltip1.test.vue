<template>
    <tst-panel>
        <template #tools>
            <tst-btn label="hideAllTooltip over pause"
                     @click="hideAllTooltipPause(2000)"/>
        </template>
        <tst-multi-panels>
            <jc-chart :options="options"></jc-chart>
        </tst-multi-panels>
    </tst-panel>
</template>

<script>
import {apxChart} from '../vendor'
import chart1 from './chart1'

export default {
    created() {
        this.options = chart1()
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