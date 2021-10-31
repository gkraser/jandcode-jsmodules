<template>
    <tst-panel no-padding debug-bg>

        <template #tools>
            <tst-checkbox label="bodyFit" v-model="cfg.bodyFit"/>
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

apx.app.onBeforeRun(() => {
    apx.app.frameRouter.addRoutes([
        {path: '/frame2', frame: import('./_frames/DynFrame2')},
        {path: '/frame3/:prop1', frame: import('./_frames/DynFrame2')},
    ])
})

let cnt = 0

export default {
    mixins: [tst.mixins.cfgStore, apx.JcApp],
    created() {
        this.title = 'ShowFrame test'
        this.cfgStore.applyDefault({
            bodyFit: false,
        })
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
            item('stack replace', () => {
                apx.showFrame({
                    frame: Frame1,
                    stack: true,
                    replace: true,
                })
            }),
            item('replace', () => {
                apx.showFrame({
                    frame: Frame1,
                    replace: true,
                })
            }),
            item('router', () => {
                apx.showFrame({
                    frame: '/frame2',
                    props: {
                        prop1: cnt++
                    }
                })
            }),
            item('router stack', () => {
                apx.showFrame({
                    frame: '/frame2',
                    stack: true,
                    props: {
                        prop1: cnt++
                    }
                })
            }),
            item('router prop1 in url', () => {
                apx.showFrame({
                    frame: `/frame3/${cnt++}`,
                })
            }),
            item('frameData load long', () => {
                apx.showFrame({
                    frame: '/frame2',
                    props: {
                        prop1: cnt++,
                        processLoad: 'long',
                    }
                })
            }),
            item('frameData load long error', () => {
                apx.showFrame({
                    frame: '/frame2',
                    props: {
                        prop1: cnt++,
                        processLoad: 'long-error',
                    }
                })
            }),
            item('frameData load quick', () => {
                apx.showFrame({
                    frame: '/frame2',
                    props: {
                        prop1: cnt++,
                        processLoad: 'quick',
                    }
                })
            }),
            item('frameData load quick error', () => {
                apx.showFrame({
                    frame: '/frame2',
                    props: {
                        prop1: cnt++,
                        processLoad: 'quick-error',
                    }
                })
            }),
            item('dialog simple', () => {
                apx.showFrame({
                    frame: Frame1,
                    shower: 'dialog',
                    props: {
                        decor: 'decor-dialog'
                    }
                })
            }),
            item('dialog load long', () => {
                apx.showFrame({
                    frame: '/frame2',
                    shower: 'dialog',
                    props: {
                        prop1: cnt++,
                        processLoad: 'long',
                        decor: 'decor-dialog'
                    }
                })
            }),
            item('dialog load long error', () => {
                apx.showFrame({
                    frame: '/frame2',
                    shower: 'dialog',
                    props: {
                        prop1: cnt++,
                        processLoad: 'long-error',
                        decor: 'decor-dialog'
                    }
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

<style lang="less">

// Отладочные стили
.debug-bg {
    .jc-decor-frame-page {
        background-color: #C6E2A6 !important;

        &__header {
            background-color: #C6E2A6 !important;
        }
    }

    .body-for-fit {
        background-color: #a9c48b !important;
    }
}

</style>
