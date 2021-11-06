<template>
    <decor-page>
        <template #toolbar>
            <jc-action icon="refresh" tooltip="Refresh this frame"
                       @click="refreshThisFrame"/>
        </template>
        <div class="col body-for-fit" style="display:flex;flex-direction: column">
            <div class="row q-gutter-x-md q-pb-md">
                <jc-panel class="col" title="props">
                    <ObjectView :obj="$props"/>
                </jc-panel>
                <jc-panel class="col" title="attrs">
                    <ObjectView :obj="$attrs"/>
                </jc-panel>
                <jc-panel class="col" title="data">
                    <ObjectView :obj="$data"/>
                </jc-panel>
                <jc-panel class="col" title="frameData">
                    <ObjectView :obj="frameData"/>
                </jc-panel>
            </div>
        </div>
    </decor-page>
</template>

<script>
/* Фрейм для демонстрации показа через router
----------------------------------------------------------------------------- */

import {apx} from '../vendor'
import ObjectView from './_components/ObjectView'

let cnt = 1

export default {
    extends: apx.JcFrame,
    components: {
        ObjectView
    },
    props: {
        prop1: {},
        prop2: {
            default: 'prop2-default',
        },
        prop3: {
            default: 'prop3-default',
        },
    },
    async frameInit(fw) {
        let data = fw.frameData
        data.data1 = 1
        data.data2 = 2
    },
    created() {
        cnt++
        this.title = 'Router-' + cnt
    },
    methods: {
        refreshThisFrame() {
            this.refreshFrame({prop1: 'refresh-' + cnt})
        }
    }
}
</script>
