<template>
    <decor-dialog buttons="ok">
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
        this.title = 'Ошибка'
    },
}
</script>
