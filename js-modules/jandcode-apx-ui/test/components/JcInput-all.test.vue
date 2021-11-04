<template>
    <tst-panel fontsize debug-bg>
        <template #tools>
            <tst-checkbox label="label" v-model="cfg.showLabel"/>
            <tst-checkbox label="hint" v-model="cfg.showHint"/>
            <tst-checkbox label="error" v-model="cfg.showError"/>
            <tst-checkbox label="clearable" v-model="cfg.showClearable"/>
            <tst-checkbox label="icons" v-model="cfg.showIcons"/>
        </template>

        <div class="row items-center q-gutter-x-md q-mb-lg">
            <q-input v-model="str1" outlined stackLabel v-bind="bindAttrs">
                <template #before v-if="cfg.showIcons">
                    <q-icon name="app-logo"/>
                    <q-icon name="mail"/>
                </template>

                <template #append v-if="cfg.showIcons">
                    <q-icon name="debug"/>
                    <q-icon name="mail"/>
                </template>

                <template #after v-if="cfg.showIcons">
                    <q-icon name="calc"/>
                    <q-icon name="home"/>
                </template>

                <template #prepend v-if="cfg.showIcons">
                    <q-icon name="help"/>
                    <q-icon name="setup"/>
                </template>
            </q-input>
            <div>q-input</div>
        </div>

        <div class="row items-start q-gutter-x-md q-mb-lg">
            <jc-input-text v-model="str1" v-bind="bindAttrs">
                <template #before v-if="cfg.showIcons">
                    <q-icon name="app-logo"/>
                    <q-icon name="mail"/>
                </template>

                <template #append v-if="cfg.showIcons">
                    <q-icon name="debug"/>
                    <q-icon name="mail"/>
                </template>

                <template #after v-if="cfg.showIcons">
                    <q-icon name="calc"/>
                    <q-icon name="home"/>
                </template>

                <template #prepend v-if="cfg.showIcons">
                    <q-icon name="help"/>
                    <q-icon name="setup"/>
                </template>
            </jc-input-text>
            <jc-input-text v-model="str1" v-bind="bindAttrs"/>
            <jc-btn label="Для масштаба"/>
            <jc-btn icon="bus"/>
            <jc-btn label="change model" @click="str1='332211'"/>
            <label class="self-center">jc-input-text</label>
            <q-checkbox v-model="bool" label="Метка справа"/>
            <div>model:[{{ str1 }}]</div>
        </div>

        <div class="row items-start q-gutter-x-md q-mb-lg">
            <jc-input-password v-model="passwd1" v-bind="bindAttrs"/>
            <jc-input-password v-model="passwd1" v-bind="bindAttrs"/>
            <jc-btn label="change model" @click="passwd1='332211'"/>
            <div>jc-input-password</div>
            <div>model:[{{ passwd1 }}]</div>
        </div>

        <div class="row items-start q-gutter-x-md q-mb-lg">
            <jc-input-date v-model="date1" v-bind="bindAttrs" style="width:9rem"/>
            <jc-input-date v-model="date1" v-bind="bindAttrs"/>
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
            showError: false,
            showClearable: false,
            showIcons: false,
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
            if (cfg.showError) {
                bindAttrs.error = true
                bindAttrs.errorMessage = "Это ошибка в этом Input"
            }
            if (cfg.showClearable) {
                bindAttrs.clearable = true
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
