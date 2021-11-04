<template>
    <component :is="decor" size="big" :bodyFit="bodyFit">
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
            <div class="row q-gutter-x-md" style="flex-grow:1">
                <jc-panel class="col" title="use frameData">
                    <span>data1: {{ frameData.data1 }}</span>
                </jc-panel>
            </div>
        </div>
    </component>
</template>

<script>
import {apx, tst} from '../vendor'
import ObjectView from './ObjectView'

let cnt = 0
let act = 'jandcode/core/apx/tst/actions/json1-pause.json'


export default {
    extends: apx.JcFrame,
    components: {
        ObjectView
    },
    props: {
        prop1: [String, Number],
        prop2: {
            default: 'prop2-default',
        },
        prop3: {
            default: 'prop3-default',
        },
        processLoad: {},
        decor: {
            default: 'decor-page'
        },
    },
    async frameInit(fw) {
        let data = fw.frameData
        data.data1 = 1
        data.data2 = 2
        //
        if (fw.props.processLoad === 'long') {
            let res = await apx.jcBase.ajax.request({
                url: act,
                params: {
                    cnt: 2,
                    pause: 3000,
                    error: false
                }
            })
            data.loadedData = res
        }
        if (fw.props.processLoad === 'long-error') {
            let res = await apx.jcBase.ajax.request({
                url: act,
                params: {
                    cnt: 2,
                    pause: 3000,
                    error: true
                }
            })
            data.loadedData = res
        }
        if (fw.props.processLoad === 'quick') {
            let res = await apx.jcBase.ajax.request({
                url: act,
                params: {
                    cnt: 2,
                    pause: 800,
                    error: false
                }
            })
            data.loadedData = res
        }
        if (fw.props.processLoad === 'quick-error') {
            let res = await apx.jcBase.ajax.request({
                url: act,
                params: {
                    cnt: 2,
                    pause: 800,
                    error: true
                }
            })
            data.loadedData = res
        }
    },
    created() {
        cnt++
        this.title = 'Frame-' + cnt
    },
    data() {
        return {}
    },
    methods: {},
    computed: {
        bodyFit() {
            return tst.getCfgStore().cfg.bodyFit
        }
    }
}
</script>

<style lang="less">
@w: 80vw;
@h: 80vh;
.jc-decor-frame-dialog--size-big {
    height: calc(@h);
    max-height: calc(@h);
    max-width: calc(@w);
    width: @w;
}
</style>