<template>
    <jc-toolbar :key="toolbarSet" :class="toolbarClass" :flat="flat">
        <template v-if="toolbarSet=='set1'">
            <div style="display:inline-block">М</div>
            <jc-action icon="bus"/>
            <jc-action icon="star"/>
            <jc-action icon="mail"/>
            <div style="display:inline-block">М</div>
            <jc-action icon="calendar"/>
            <jc-action icon="inbox"/>
            <div style="display:inline-block">М</div>
        </template>

        <template v-if="toolbarSet=='menu1'">
            <jc-action label="Конфигурации" icon="config"/>
            <jc-action icon="calc"/>
            <jc-action label="Задачи"/>
            <div style="display:inline-block">Метка</div>
            <jc-action label="Управление" icon="admin"/>

            <jc-action icon="calc" label="Меню 0">
                <SubMenu1/>
            </jc-action>
            <jc-action icon="more-v">
                <SubMenu1/>
            </jc-action>
            <jc-action icon="more-h">
                <div class="q-pa-md q-gutter-sm row" style="width:700px">
                    <jc-btn label="Кнопка1 закроет" color="positive" v-close-popup/>
                    <jc-btn label="Просто кнопка2" color="positive"/>
                    <jc-btn label="Просто кнопка3" color="positive"/>
                </div>
            </jc-action>
            <jc-action label="Меню 1">
                <SubMenu1/>
            </jc-action>

            <jc-action icon="mail"/>
            <jc-action icon="more-h"/>
        </template>

        <template v-if="toolbarSet=='menu2'">
            <jc-action label="Конфигурации" icon="app-logo"/>
            <jc-action icon="app-logo"/>
            <jc-action label="Задачи"/>
            <div style="display:inline-block">Метка</div>
            <jc-action label="Управление" icon="admin"/>
        </template>

        <template v-if="toolbarSet=='logo1'">
            <jc-action icon="menu"/>
            <jc-toolbar-title text="Заголовок приложения" @click="own.home()"/>
            <jc-action icon="star"/>
            <jc-action icon="mail"/>
            <jc-toolbar-title text="ThemeNav"/>
            <jc-action icon="star"/>
            <jc-toolbar-title text="Заголовок" text2="Это подзаголовок"/>
        </template>

        <template v-if="toolbarSet=='button1'">
            <q-separator vertical/>
            <jc-action icon="mail"/>
            <jc-btn class="jc-action" flat icon="mail">
                <q-badge floating color="orange">2</q-badge>
            </jc-btn>

            <q-separator vertical/>
            <jc-action label="Action"/>
            <jc-btn class="jc-action" flat label="Button"/>

            <q-separator vertical/>
            <jc-action icon="mail" label="Action"/>
            <jc-btn class="jc-action" flat icon="mail" label="Button"/>

            <q-separator vertical/>
            <jc-action icon="mail" label="Action">
                <jc-action label="Action"/>
            </jc-action>
            <jc-btn class="jc-action" flat icon="mail" label="Button">
                <jc-popup>
                    <jc-action label="Action"/>
                </jc-popup>
            </jc-btn>
        </template>

        <template v-if="toolbarSet=='button2'">
            <q-separator vertical/>
            <jc-action icon="mail"/>
            <jc-btn icon="mail">
                <q-badge floating color="orange">2</q-badge>
            </jc-btn>

            <q-separator vertical/>
            <jc-action label="Action"/>
            <jc-btn label="Button"/>

            <q-separator vertical/>
            <jc-action icon="mail" label="Action"/>
            <jc-btn icon="mail" label="Button"/>

            <q-separator vertical/>
            <jc-action icon="mail" label="Action">
                <jc-action label="Action"/>
            </jc-action>
            <jc-btn icon="mail" label="Button">
                <jc-popup>
                    <jc-action label="Action"/>
                </jc-popup>
            </jc-btn>
        </template>

        <template v-if="toolbarSet=='text-only'">
            <span>только текст</span>
        </template>
    </jc-toolbar>
</template>

<script>
import {apx} from '../../vendor'

let {h, resolveComponent} = apx.Vue

let _slot = (arr) => {
    return {
        default: () => arr
    }
}

export function SubMenu1(props, context) {
    let Act = resolveComponent('jc-action')

    function sub1() {
        return [
            h(Act, {label: 'Без иконки пункт'}),
            h(Act, {label: 'Этот с иконкой ', icon: 'bus'}),
            h(Act, {label: 'Этот тоже с иконкой ', icon: 'mail'}),
            h(Act, {label: 'Опять без иконки пункт'}),
        ]
    }

    function sub2() {
        return [
            h(Act, {label: 'Без иконки пункт'}),
            h(Act, {label: 'Этот с иконкой ', icon: 'bus'}, _slot(sub1())),
            h(Act, {label: 'Этот тоже с иконкой ', icon: 'mail'}),
            h(Act, {label: 'Опять без иконки пункт'}),
        ]
    }

    function sub3() {
        return [
            h(Act, {label: 'Без иконки пункт'}),
            h(Act, {label: 'Этот тоже без иконки'}, _slot(sub1())),
            h(Act, {label: 'Этот тоже '}),
            h(Act, {label: 'Опять без иконки пункт'}),
        ]
    }

    return [
        h(Act, {label: 'Без иконки пункт'}, _slot(sub2())),
        h(Act, {label: 'Этот с иконкой ', icon: 'bus'}),
        h(Act, {
            label: 'Этот тоже с иконкой и имя его длиннное', icon: 'mail'
        }, _slot(sub1())),
        h(Act, {label: 'Опять без иконки пункт'}),
        h(Act, {label: 'Без иконки подменю'}, _slot(sub3())),
    ]
}

export function createToolbarSets() {
    return [
        {value: 'set1', label: 'Просто иконки'},
        {value: 'menu1', label: 'Меню 1'},
        {value: 'menu2', label: 'Меню 2'},
        {value: 'logo1', label: 'Логотип 1'},
        {value: 'button1', label: 'Кнопки 1'},
        {value: 'button2', label: 'Кнопки 2'},
        {value: 'text-only', label: 'Только текст'},
    ]
}

export default {
    components: {
        SubMenu1
    },
    props: {
        toolbarSet: {
            default: ''
        },
        toolbarClass: '',
        flat: {
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        clickItem() {
            //todo apx.showMsg("Событие click")
        }
    },
}
</script>

<style lang="less">
</style>
