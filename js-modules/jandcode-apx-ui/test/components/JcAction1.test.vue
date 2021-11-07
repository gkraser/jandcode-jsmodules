<template>
    <tst-panel fontsize debug-bg>
        <template #tools>
            <tst-select v-model="cfg.toolbarSet" :options="toolbarSets"
                        label="toolbarSet"/>
            <tst-checkbox label="flatToolbar" v-model="cfg.flatToolbar"/>
        </template>

        <div class="row items-center q-gutter-x-sm q-mb-md">
            <div>action без toolbar:</div>
            <jc-action icon="bus"/>
            <jc-action icon="star"/>
            <jc-action icon="mail"/>
            <jc-action label="Конфигурации" icon="config"/>
            <jc-action label="Конфигурации" icon="config" kind="primary"/>
            <jc-action label="Задачи"/>
            <jc-action label="Меню 1">
                <SubMenu1/>
            </jc-action>
            <jc-action icon="more-h">
                <SubMenu1/>
            </jc-action>
            <jc-action label="Меню 2" icon="mail">
                <SubMenu1/>
            </jc-action>
        </div>
        <div class="column q-mt-sm q-gutter-y-md toolbar-place">
            <AppToolbarDemoSet :toolbarSet="cfg.toolbarSet" :flat="cfg.flatToolbar"/>
            <AppToolbarDemoSet toolbarSet="menu1" :flat="cfg.flatToolbar"/>
            <AppToolbarDemoSet toolbarSet="logo1" :flat="cfg.flatToolbar"/>
            <div class="q-mb-lg"/>
            <AppToolbarDemoSet toolbarSet="logo1"
                               toolbar-class="bg-primary text-white q-pa-md"
                               :flat="cfg.flatToolbar"/>
            <AppToolbarDemoSet :toolbarSet="cfg.toolbarSet"
                               toolbar-class="bg-primary text-white q-pa-md"
                               :flat="cfg.flatToolbar"/>
        </div>
    </tst-panel>
</template>

<script>
import AppToolbarDemoSet, {createToolbarSets, SubMenu1} from './_components/AppToolbarDemoSet'
import {tst} from '../vendor'

export default {
    mixins: [tst.mixins.cfgStore],
    components: {
        AppToolbarDemoSet,
        SubMenu1,
    },
    created() {
        this.cfgStore.applyDefault({
            toolbarSet: 'set1',
            flatToolbar: true,
        })
    },
    data() {
        return {
            toolbarSets: createToolbarSets(),
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg

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
}

</style>


