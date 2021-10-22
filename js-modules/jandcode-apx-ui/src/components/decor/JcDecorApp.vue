<template>
    <q-layout view="hHh Lpr fff" class="jc-decor-app" :container="container">

        <q-header :elevated="false" class="jc-decor-app__header">
            <slot name="top-header"></slot>
            <q-toolbar>
                <slot name="toolbar-left">
                </slot>

                <q-space/>

                <slot name="toolbar-right">
                </slot>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="own.left" :elevated="false"
                  side="left" bordered
                  content-class="jc-decor-app__side jc-decor-app__side--left"
                  :width="own.leftWidth">
            <q-scroll-area class="fit">

                <slot name="left">
                </slot>

            </q-scroll-area>
        </q-drawer>

        <q-drawer v-model="own.right" behavior="mobile" :elevated="false"
                  no-swipe-open no-swipe-close no-swipe-backdrop
                  side="right" bordered
                  content-class="jc-decor-app__side jc-decor-app__side--right"
                  :width="own.rightWidth">
            <q-scroll-area class="fit">

                <slot name="right">
                </slot>

            </q-scroll-area>
        </q-drawer>

        <q-page-container class="jc-decor-app__main">
            <slot name="main">
                <q-page>
                    <jc-frame-shower-page></jc-frame-shower-page>
                </q-page>
            </slot>
        </q-page-container>

    </q-layout>
</template>

<script>
import {apx} from "../vendor"

export default {
    name: 'jc-decor-app',

    extends: apx.JcDecorApp,

    props: {
        container: {
            type: Boolean,
            default: null
        }
    }
}
</script>
