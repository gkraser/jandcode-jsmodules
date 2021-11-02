<template>
    <tst-panel>
        <tst-multi-panels>
            <jc-chart :options="options"></jc-chart>
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
}
</script>