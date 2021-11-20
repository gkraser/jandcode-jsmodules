<template>
    <div>
        <div class="row q-gutter-x-sm no-wrap">
            <span>cell:{{ text }} = <b>{{ text2 }}</b></span>
            <jc-btn :label="text"/>
            <div
                style="display: inline-block;width:100px;height:20px;border:1px solid red;">
                <jc-chart :options="chart1" class="fit"/>
            </div>
        </div>
    </div>
</template>

<script>
import '@jandcode/apx-chart'
import chart1 from '@jandcode/apx-chart/test/pages/_data/chart1-small'

export default {
    props: {
        text: {},
        text2: {},
    },
    created() {
        this.chart1 = chart1({})
    },
    mounted() {
        console.info("mount CellComplex1", this.text, this);
    },
    beforeUnmount() {
        console.info("UNMOUNT CellComplex1", this.text, this);
    },
}
</script>
