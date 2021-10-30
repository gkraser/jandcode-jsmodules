<template>
    <decor-page>
        <div class="row q-gutter-x-md">
            <jc-panel class="col" title="props">
                <ObjectView :obj="$props"/>
            </jc-panel>
            <jc-panel class="col" title="attrs">
                <ObjectView :obj="$attrs"/>
            </jc-panel>
            <jc-panel class="col" title="data">
                <ObjectView :obj="$data"/>
            </jc-panel>
        </div>
    </decor-page>
</template>

<script>
import {apx} from '../vendor'
import ObjectView from './ObjectView'

let cnt = 0

export default {
    extends: apx.JcFrame,
    components: {
        ObjectView
    },
    created() {
        cnt++
        this.title = 'Frame-' + cnt
    },
    frameInit(fw) {
    },
    data() {
        return {}
    },
    methods: {},
}
</script>
