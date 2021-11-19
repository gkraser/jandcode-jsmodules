<template>
    <div>
        <div>cell:{{ text }} = <b>{{ text2 }}</b>
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
    data() {
        return {}
    },
    created() {
        this.chart1 = chart1({})
    },
    mounted() {
        console.info("mount", this.text, this);
    },
    beforeUnmount() {
        console.info("UNMOUNT!!!!!!!!!", this.text, this);
    },
    methods: {},
}
</script>
