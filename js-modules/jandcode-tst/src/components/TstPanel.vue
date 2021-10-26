<template>
    <div class="tst-panel">
        <div class="tst-panel--head">
            <template v-if="cfgTst.module">
                <div class="tst-panel--value-big">{{ cfgTst.filename }}</div>
                <span class="tst-panel--arrow"></span>
                <div class="tst-panel--value-small"><a
                    :href="'?filter='+cfgTst.dirname+'/'">{{ cfgTst.dirname }}/</a>
                </div>
                <span class="tst-panel--arrow"></span>
                <div class="tst-panel--value-small"><a
                    :href="'?filter='+cfgTst.moduleName+'/'">{{ cfgTst.moduleName }}/</a>
                </div>
                <span class="tst-panel--divider" :style="{flex:1}"></span>
            </template>
        </div>

        <div class="tst-panel--head" id="tst-tools">
            <tst-btn @click="resetCfg" label="resetCfg"/>
            <tst-checkbox label="debugBg" v-model="cfg.debugBg" v-if="debugBg"/>
            <tst-fontsize v-if="fontsize"/>
            <slot name="tools"/>
        </div>

        <div class="tst-panel--head" v-if="$slots['tools-1']">
            <slot name="tools-1"/>
        </div>

        <div class="tst-panel--head" v-if="$slots['tools-2']">
            <slot name="tools-2"/>
        </div>

        <div class="tst-panel--body" ref="body"
             :class="[noPadding?'tst-panel--no-padding':'', bodyClass]"
             :style="bodyStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {jcBase} from '../vendor'
import * as mixins from '../mixins'

export default {
    name: 'tst-panel',
    mixins: [mixins.cfgStore],
    props: {
        debugBg: {
            type: Boolean,
            default: null
        },
        fontsize: {
            type: Boolean,
            default: null
        },
        noPadding: {
            type: Boolean,
            default: null
        },
        bodyClass: {
            default: ''
        },
        bodyStyle: {
            default: ''
        }
    },
    data() {
        return {}
    },
    created() {
        this.cfgStore.applyDefault({
            debugBg: false,
        })
    },
    computed: {
        cfgTst() {
            return jcBase.cfg.tst || {}
        },
    },
    methods: {
        resetCfg() {
            return this.cfgStore.reset();
        },
        applyCfg() {
            document.body.classList.toggle("debug-bg", this.cfg.debugBg)
        }
    }
}
</script>

<style>

.tst-panel {
    min-height: 100vh;
}

.tst-panel--head {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    border-bottom: 1px solid silver;
    background-color: #f5f5f5;
    padding: 4px 10px;
    display: flex;
    min-height: 34px;
    align-items: center;
    flex-wrap: wrap;
}

.tst-panel--head > *:not(:first-child) {
    margin-left: 8px;
}

.tst-panel--head input[type="range"] {
    color: red;
    width: 60px;
}

.tst-panel--head .tst-panel--value-big {
    color: navy;
    font-size: 12px;
    font-family: "Lucida Console", Monaco, monospace;
}

.tst-panel--head .tst-panel--value-small {
    font-size: 11px;
    color: gray;
    font-family: "Lucida Console", Monaco, monospace;
}

.tst-panel--head select {
    color: navy;
    font-size: 11px;
    font-family: "Lucida Console", Monaco, monospace;
    padding: 2px;
    background-color: #f5f5f5;
}

.tst-panel--head button {
    font-size: 11px;
    white-space: nowrap;
}

.tst-panel--head a {
    text-decoration: none;
    color: navy;
}

.tst-panel--head a:hover {
    text-decoration: underline;
}

.tst-panel--body {
    padding: 20px 20px;
}

.tst-panel--body.tst-panel--no-padding {
    padding: 0;
}

.tst-panel--size-label {
    min-width: 30px;
}

.tst-panel--divider {
    width: 4px;
}

.tst-panel--arrow {
    padding-bottom: 4px;
}

.tst-panel--arrow::before {
    content: '\00BB';
}
</style>