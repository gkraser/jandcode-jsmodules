<template>
    <q-card>
        <q-card-section>Dialog 1. prop1={{ prop1 }}</q-card-section>
    </q-card>
</template>

<script>
import {apx} from '../../vendor'

export default {
    extends: apx.JcFrame,
    props: {
        prop1: {
            default: 'prop1-default'
        }
    },
    created() {
        this.title = 'Dialog1.vue'
    },
    frameInit(fw) {
    },
    data() {
        return {}
    },
    methods: {},
}
</script>
