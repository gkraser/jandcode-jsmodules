<template>
    <div>
        Runner1
        <q-btn label="Frame1" @click="frame1"/>
        <q-btn label="Frame1(dialog)" @click="frame1dialog"/>
        <div>frame place:</div>
        <jc-frame-shower-page name="test1"/>
    </div>
</template>

<script>
import {apx} from './vendor'
import Frame1 from './Frame1'

export default {
    components: {
        'JcFrameShowerPage': apx.JcFrameShowerPage,
    },
    props: {},
    data() {
        return {}
    },
    methods: {
        frame1() {
            console.info("frameModule.JcFrameShowerPage", apx.JcFrameShowerPage);
            apx.showFrame({
                frame: Frame1,
                shower: 'test1',
            })
        },
        frame1dialog() {
            apx.showFrame({
                frame: Frame1,
                shower: 'dialog',
            })
        }
    },
}
</script>
