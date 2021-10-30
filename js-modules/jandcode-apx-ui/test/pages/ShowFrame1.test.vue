<template>
    <tst-panel no-padding>

        <template #tools>
        </template>

        <div class="wrap-app">
            <jc-decor-app-std container style="height: calc(100vh - 72px);"
                              :ownComp="this" :breadcrumbsShowOne="true">

                <template #left>
                    <q-item-label header>Меню</q-item-label>
                    <jc-side-menu>
                        <template v-for="item in menu1">
                            <jc-side-menu-item :label="item.label" @click="item.click()"
                                               :icon="item.icon"/>
                        </template>
                    </jc-side-menu>
                </template>

            </jc-decor-app-std>
        </div>

    </tst-panel>
</template>

<script>
import {apx, tst} from '../vendor'
import Frame1 from './_frames/Frame1'

let item = (label, click) => {
    return {label: label, click: click, icon: 'file'}
}

export default {
    mixins: [tst.mixins.cfgStore, apx.JcApp],
    created() {
        this.title = 'ShowFrame test'
        this.cfgStore.applyDefault({})
        //
        this.menu1 = [
            item('simple', () => {
                apx.showFrame({
                    frame: Frame1,
                })
            }),
            item('stack', () => {
                apx.showFrame({
                    frame: Frame1,
                    stack: true,
                })
            }),
        ]
    },
    data() {
        return {
            menu1: []
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg
        },
    }
}
</script>
