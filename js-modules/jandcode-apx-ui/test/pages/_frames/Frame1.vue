<template>
    <decor-page>
        <div>frame body</div>
    </decor-page>
</template>

<script>
import {apx} from '../vendor'

let cnt = 0

export default {
    extends: apx.JcFrame,
    created() {
        cnt++
        this.title = 'Frame-' + cnt
    },
    frameInit(fw) {
    },
    data() {
        return {}
    },
    methods: {},
}
</script>
