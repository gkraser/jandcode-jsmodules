<template>
    <tst-panel class="jcdecorappstd1-test-884f6234" debug-bg no-padding>

        <template #tools>
            <tst-select v-model="cfg.toolbarSetLeft" :options="toolbarSets"
                        label="toolbar left"/>
            <tst-select v-model="cfg.toolbarSetRight" :options="toolbarSets"
                        label="toolbar right"/>
            <tst-checkbox label="left" v-model="cfg.left"/>
            <tst-checkbox label="title2" v-model="cfg.title2"/>
            <tst-checkbox label="frameIcon" v-model="cfg.frameIcon"/>
            <tst-select v-model="cfg.frameToolbar" :options="toolbarSets"
                        label="frameToolbar"/>
        </template>

        <div class="wrap-app">
            <jc-decor-app-std container class="tst-body-fit"
                              :ownComp="this">
                <template #toolbar-left v-if="cfg.toolbarSetLeft">
                    <AppToolbarDemoSet :toolbarSet="cfg.toolbarSetLeft" flat/>
                </template>

                <template #toolbar-right>
                    <AppToolbarDemoSet :toolbarSet="cfg.toolbarSetRight" flat/>
                </template>

                <template #left>
                    <q-item-label header>Меню</q-item-label>
                    <SideMenu1 :items="sideMenu_itemsSet.items1" :levels="3"/>
                </template>

            </jc-decor-app-std>
        </div>

    </tst-panel>
</template>

<script>
import {apx, tst} from '../vendor'

import AppToolbarDemoSet, {createToolbarSets, SubMenu1} from './_components/AppToolbarDemoSet'
import SideMenu1 from './_components/SideMenu1'
import Frame1 from './_frames/DecorAppFrame1'

apx.icons.registerIcons({
    'png1': require('../_images/calc.png'),
    'svg1': require('../_images/cpu.svg'),
})

let sideMenu_itemsSet = {
    items1: [
        {label: 'Элемент c иконкой', icon: 'bus'},
        {label: 'Элемент без иконки', icon: '', opened: true},
        {label: 'Элемент с svg', icon: 'svg1'},
        {label: 'Элемент с png', icon: 'png1'},
    ],

    itemsNoIcon: [
        {label: 'Элемент 1'},
        {label: 'Элемент 2'},
        {label: 'Элемент 3'},
        {label: 'Элемент 4'},
    ],

    itemsFs: [
        {label: 'Папка 1', icon: 'folder1'},
        {label: 'Папка 2', icon: 'folder1'},
        {label: 'Файл 3', icon: 'file1'},
        {label: 'Файл 4', icon: 'file1'},
    ],
}

export default {
    mixins: [tst.mixins.cfgStore, apx.JcApp],
    components: {
        AppToolbarDemoSet,
        SubMenu1,
        Frame1,
        SideMenu1,
    },
    created() {
        this.title = 'Заголовок приложения'
        this.frame1 = null
        this.cfgStore.applyDefault({
            toolbarSetRight: 'menu1',
            toolbarSetLeft: null,
            left: true,

            title2: false,

            // frame
            frameIcon: false,
            frameToolbar: null,
        })
    },
    mounted() {
        apx.showFrame({
            frame: Frame1
        }).then((fw) => {
            this.frame1 = fw
            this.applyCfg()
        })
    },
    data() {
        return {
            toolbarSets: [null].concat(createToolbarSets()),
            sideMenu_itemsSet: sideMenu_itemsSet,
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg

            this.left = cfg.left;

            this.title2 = cfg.title2 ? 'Это такой подзаголовок приложения' : null;

            //
            let frm = this.frame1
            if (frm) {
                frm.vueInst.title2 = cfg.title2 ? 'Это такой фрейма подзаголовок' : null;
                frm.vueInst.icon = cfg.frameIcon ? 'bus' : null;
                frm.vueInst.toolbarSet = cfg.frameToolbar;
            }
        },
    }
}
</script>

<style lang="less">

// Отладочные стили
.debug-bg {
    .jc-toolbar {
        background-color: #C6E2A6 !important;
        color: black;

        & > * {
            background-color: #d7edc5;
        }
    }

    .jc-shower-main-breadcrumbs {
        background-color: #C6E2A6 !important;

        & > * {
            background-color: #d7edc5;

            & > * {
                background-color: #b8d99d;
            }

        }

    }

    .jc-decor-frame-page {
        background-color: #f3f3d7;
    }
}

.jc-decor-frame-page {
    min-height: 100%;
}

.jcdecorappstd1-test-884f6234 {

    .tst-apx-panel--body {
        //padding: 0;
    }


    .wrap-app {
        //border: 1px solid gray;
        // display: inline-block;
        // width: 80vw;
    }

}

</style>
