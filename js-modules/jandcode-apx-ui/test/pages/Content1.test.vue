<template>
    <tst-panel fontsize>
        <div v-html="htmlText" class="content"/>
    </tst-panel>
</template>

<script>
import '../vendor'

import html1 from './_data/page1.html'

console.info("html1",html1);

export default {
    created() {
        this.htmlText = html1
    },
    data() {
        return {}
    },
    methods: {}
}
</script>

<style lang="less">

.content {
    width: 50vw;
    line-height: 1.4;
}

</style>
