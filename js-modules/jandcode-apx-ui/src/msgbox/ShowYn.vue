<template>
    <decor-dialog buttons="yn">
        {{ text }}
    </decor-dialog>
</template>

<script>
import {apx} from '../vendor'

export default {
    extends: apx.JcFrame,
    props: {
        text: null,
    },
    created() {
        this.title = 'Подтверждение'
    },
}
</script>
