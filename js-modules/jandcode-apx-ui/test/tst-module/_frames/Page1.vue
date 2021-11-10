<template>
    <decor-page>
        Макет фрейма 1
    </decor-page>
</template>

<script>
import {apx} from '../vendor'

export default {
    extends: apx.JcFrame,
    created() {
        this.title = 'Макет фрейма 1'
    },
    frameInit(fw) {
    },
    data() {
        return {}
    },
    methods: {},
}
</script>
