<template>
    <decor-dialog>
        Макет диалога 1
    </decor-dialog>
</template>

<script>
import {apx} from '../vendor'

export default {
    extends: apx.JcFrame,
    created() {
        this.title = 'Макет диалога 1'
    },
    frameInit(fw) {
    },
    data() {
        return {}
    },
    methods: {},
}
</script>
