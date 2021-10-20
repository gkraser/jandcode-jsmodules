<template>
    <div class="frame-cont">
        Frame1
        <q-btn label="q"/>
        <q-btn label="vue-unmount-this" @click="vueUnmountThis()"/>
    </div>
</template>

<script>
import {apx} from './vendor'

export default {
    extends: apx.JcFrame,
    props: {},
    data() {
        return {}
    },
    created() {
        //this.frameWrapper.vueInst.$
    },
    methods: {
        vueUnmountThis() {
            console.info("this.frameWrapper", this.frameWrapper);
            this.frameWrapper.vueApp.unmount()
        }
    },
}
</script>

<style scoped>
.frame-cont {
    background-color: white;
}
</style>