<template>
    <!--todo в quasar есть глюк с мигающими scrollbar, пока не исправлен, нужно укзаывать
             container style="width:100vw;height: 100vh"
    -->
    <decor-app container style="width:100vw;height: 100vh">
        <template #toolbar>
        </template>

        <template #left>
            <q-item-label header>Меню</q-item-label>
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
        this.title = "Samples JsModules"
    },

    methods: {}
}
</script>
