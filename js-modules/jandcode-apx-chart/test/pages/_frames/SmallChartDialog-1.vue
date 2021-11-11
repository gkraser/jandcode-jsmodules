<template>
    <decor-dialog>
        <div class="row q-gutter-sm q-mb-lg">
            <template v-for="i in 10">
                <div
                    style="display: inline-block;width:100px;height:50px;border:1px solid red;">
                    <jc-chart :options="createChart()" class="fit"/>
                </div>
            </template>
        </div>
        <div class="row q-gutter-sm q-mb-lg">
            <template v-for="i in 10">
                <jc-chart :options="createChart({color:'red'})"
                          style="display: inline-block;width:100px;height:30px;border:1px solid green;"/>
            </template>
        </div>
    </decor-dialog>
</template>

<script>
import {apx} from '../vendor'
import chart1 from '../_data/chart1-small'

export default {
    extends: apx.JcFrame,
    created() {
        this.title = 'SmallChartDialog-1'
    },
    methods: {
        createChart(opts) {
            return chart1(opts)
        }
    }
}
</script>
