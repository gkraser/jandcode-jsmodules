<template>
    <!--todo в quasar есть глюк с мигающими scrollbar, пока не исправлен, нужно укзаывать
             container style="width:100vw;height: 100vh"
    -->
    <decor-app container style="width:100vw;height: 100vh">
        <template #toolbar>
        </template>

        <template #left>
            <q-item-label header>Меню</q-item-label>
            <jc-side-menu>
                <jc-side-menu-item label="Фреймы" icon="folder" :opened="true">
                    <jc-side-menu-item label="fileInit" icon="frame"
                                       :frame="import('./frames/FrameInit')"
                                       :frameProps="{cnt:5}"/>
                </jc-side-menu-item>
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
        this.title = "Samples JsModules"
    },

    methods: {}
}
</script>
