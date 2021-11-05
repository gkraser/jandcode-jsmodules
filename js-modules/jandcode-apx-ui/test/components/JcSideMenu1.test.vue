<template>
    <tst-panel class="jcsidemenu2-test-7ced957a" debug-bg fontsize>
        <template #tools>
        </template>

        <div class="row q-mb-md items-center place1">
            <label>label</label>
            <div class="block">
                <jc-side-menu-item label="Пункт 1" icon="bus"/>
            </div>
            <div class="block">
                <jc-side-menu-item label="Пункт 1" icon="bus">
                    <jc-side-menu-item label="Пункт 1 выпадающий"/>
                </jc-side-menu-item>
            </div>
            <div class="block">
                <jc-side-menu-item label="Пункт 1"/>
            </div>
            <div class="block">
                <jc-side-menu-item label="href local" href="_tst"/>
            </div>
            <div class="block">
                <jc-side-menu-item label="href local blank" href="_tst" target="blank"/>
            </div>
            <div class="block">
                <jc-side-menu-item label="showFrame"
                                   @click="apx.showFrame({frame:import('./_frames/Dialog1'),shower:'dialog',props:{prop1:'assigned prop1'}})"/>
            </div>
        </div>

        <div class="row q-gutter-md q-mb-md">

            <div class="col-3">
                <div>events</div>
                <jc-side-menu bordered
                              @click="handle_click1">
                    <jc-side-menu-item label="item1"/>
                    <jc-side-menu-item label="item2" opened>
                        <jc-side-menu-item label="item3"/>
                        <jc-side-menu-item label="item4">
                            <jc-side-menu-item label="item5"/>
                        </jc-side-menu-item>
                    </jc-side-menu-item>
                </jc-side-menu>
            </div>

            <div class="col-3">
                <div>model: model_item2:{{ model_item2 }} model_item4:{{ model_item4 }}
                </div>
                <jc-side-menu bordered>
                    <jc-side-menu-item label="item1"/>
                    <jc-side-menu-item label="item2" v-model="model_item2">
                        <jc-side-menu-item label="item3"/>
                        <jc-side-menu-item label="item4" v-model="model_item4">
                            <jc-side-menu-item label="item5"/>
                        </jc-side-menu-item>
                    </jc-side-menu-item>
                </jc-side-menu>
            </div>

        </div>

        <div class="row q-gutter-md q-mb-md">

            <div class="col">
                <SideMenu1 :items="itemsSet.items1" :levels="3" bordered/>
            </div>

            <div class="col">
                <SideMenu1 :items="itemsSet.itemsFs" :levels="3" bordered/>
            </div>

            <div class="col">
                <SideMenu1 :items="itemsSet.itemsNoIcon" :levels="3" bordered/>
            </div>

        </div>


    </tst-panel>
</template>

<script>
import {apx} from '../vendor'
import SideMenu1 from './_components/SideMenu1'

apx.icons.registerIcons({
    'png1': require('../_images/calc.png'),
    'svg1': require('../_images/cpu.svg'),
    'folder1': require('../_images/folder.svg'),
    'file1': require('../_images/file.svg'),
})

let itemsSet = {
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
    components: {
        SideMenu1
    },
    setup() {
        return {apx}
    },
    data() {
        return {
            itemsSet: itemsSet,
            model_item2: false,
            model_item4: true,
        }
    },
    methods: {
        handle_click1(th) {
            console.info("handle_click1", th, th.label);
        },
    }
}
</script>

<style lang="less">

// Отладочные стили
.debug-bg {

    .place1 {
        background-color: #C6E2A6 !important;
        color: black;

        & > * {
            background-color: #d7edc5;
        }
    }
}

.jcsidemenu2-test-7ced957a {

    .block {
        margin-right: 10px;
    }

}

</style>
