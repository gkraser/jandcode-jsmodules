<template>
    <decor-page>
        Hello!
    </decor-page>
</template>

<script>
import {apx} from '../vendor'

export default {
    extends: apx.JcFrame,
    created() {
        this.title = 'Home'
    },
}
</script>
