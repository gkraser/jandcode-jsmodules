<template>
    <decor-app>
        <template #toolbar>
        </template>

        <template #left>
            <q-item-label header>Меню</q-item-label>
            <jc-side-menu>
            </jc-side-menu>
        </template>

    </decor-app>
</template>

<script>
import {apx} from './vendor'

export default {
    extends: apx.JcApp,
    components: {},

    data() {
        return {}
    },

    created() {
        this.title = "App1"
    },

    methods: {}
}
</script>

