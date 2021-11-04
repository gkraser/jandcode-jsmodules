<template>
    <tst-panel fontsize debug-bg>
        <template #tools>
            <tst-checkbox label="label" v-model="cfg.showLabel"/>
            <tst-checkbox label="hint" v-model="cfg.showHint"/>
        </template>

        <div class="row items-center q-gutter-x-md q-mb-lg">
            <q-input v-model="str1" outlined stackLabel v-bind="bindAttrs"/>
            <div>q-input</div>
        </div>

        <div class="row items-baseline q-gutter-x-md q-mb-lg">
            <jc-input-text v-model="str1" v-bind="bindAttrs"/>
            <jc-input-text v-model="str1" v-bind="bindAttrs"/>
            <jc-btn label="Для масштаба"/>
            <jc-btn icon="bus"/>
            <jc-btn label="change model" @click="str1='332211'"/>
            <label>jc-input-text</label>
            <q-checkbox v-model="bool" label="Метка справа"/>
            <div>model:[{{ str1 }}]</div>
        </div>

        <div class="row items-center q-gutter-x-md q-mb-lg">
            <jc-input-password v-model="passwd1" vbind="bindAttrs"/>
            <jc-input-password v-model="passwd1" vbind="bindAttrs"/>
            <jc-btn label="change model" @click="passwd1='332211'"/>
            <div>jc-input-password</div>
            <div>model:[{{ passwd1 }}]</div>
        </div>

        <div class="row items-center q-gutter-x-md q-mb-lg">
            <jc-input-date v-model="date1" vbind="bindAttrs"/>
            <jc-input-date v-model="date1" vbind="bindAttrs"/>
            <jc-btn label="change model" @click="date1='2020-12-21'"/>
            <div>jc-input-date</div>
            <div>model:[{{ date1 }}]</div>
        </div>

    </tst-panel>
</template>

<script>
import {tst} from '../vendor'

export default {
    mixins: [tst.mixins.cfgStore],
    created() {
        this.cfgStore.applyDefault({
            showLabel: false,
            showHint: false,
        })
    },
    data() {
        return {
            bool: true,
            str1: 'Это строка',
            passwd1: '',
            date1: '1999-12-23',
            bindAttrs: {}
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg
            //
            let bindAttrs = {}

            if (cfg.showLabel) {
                bindAttrs.label = "Это метка для Input"
            }
            if (cfg.showHint) {
                bindAttrs.hint = "Это hint для Input"
            }

            this.bindAttrs = bindAttrs
        },
    }
}
</script>

<style lang="less">

.debug-bg {
    .tst-panel--body {

        & > * {
            background-color: #d7edc5;
        }


    }
}

</style>
