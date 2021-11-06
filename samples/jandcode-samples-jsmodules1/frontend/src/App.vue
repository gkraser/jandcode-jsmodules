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
                                       @click="frameInit1"/>

                    <jc-side-menu-item label="fileInit in dialog" icon="frame"
                                       @click="frameInit1_dialog"/>

                    <jc-side-menu-item label="fileInit with error" icon="frame"
                                       @click="frameInit1_withError"/>

                    <jc-side-menu-item label="fileInit in dialog with error" icon="frame"
                                       @click="frameInit1_dialog_withError"/>

                    <jc-side-menu-item label="router" icon="frame"
                                       @click="router1"/>

                    <jc-side-menu-item label="router stack" icon="frame"
                                       @click="routerStack1"/>

                    <jc-side-menu-item label="router stack replace" icon="frame"
                                       @click="routerStackReplace1"/>

                </jc-side-menu-item>

                <jc-side-menu-item label="Разное" icon="folder">

                    <jc-side-menu-item label="Иконки" icon="frame"
                                       @click="icons1"/>

                </jc-side-menu-item>
            </jc-side-menu>
        </template>

    </decor-app>
</template>

<script>
import {apx} from './vendor'

let cnt = 1

export default {
    extends: apx.JcApp,
    components: {},

    data() {
        return {}
    },

    created() {
        this.title = "Samples JsModules"
    },

    methods: {

        frameInit1() {
            apx.showFrame({
                frame: import('./frames/FrameInit'),
                props: {cnt: 5}
            })
        },
        frameInit1_dialog() {
            apx.showFrame({
                frame: import('./frames/FrameInit-dialog'),
                shower: 'dialog',
                props: {cnt: 5}
            })
        },
        frameInit1_withError() {
            apx.showFrame({
                frame: import('./frames/FrameInit'),
                props: {cnt: 500}
            })
        },
        frameInit1_dialog_withError() {
            apx.showFrame({
                frame: import('./frames/FrameInit-dialog'),
                shower: 'dialog',
                props: {cnt: 500}
            })
        },
        router1() {
            apx.showFrame({
                frame: '/router',
                props: {prop1: cnt++}
            })
        },
        routerStack1() {
            apx.showFrame({
                frame: '/router',
                stack: true,
                props: {prop1: cnt++}
            })
        },
        routerStackReplace1() {
            apx.showFrame({
                frame: '/router',
                stack: true,
                replace: true,
                props: {prop1: cnt++}
            })
        },
        icons1() {
            apx.showFrame({
                frame: import('./frames/Icons'),
            })
        },

    }
}
</script>
