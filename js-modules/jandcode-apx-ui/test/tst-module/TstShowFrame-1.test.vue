<template>
    <tst-panel no-padding>
        <tst-show-frame :frames="frames"/>
    </tst-panel>
</template>

<script>
import '../vendor'

export default {
    created() {
        this.frames = {
            frame1: {
                frame: import('./_frames/Page1'), props: {prop1: '111'}
            },
            frame2: {
                frame: import('./_frames/Page2'), props: {prop1: '222'}
            },
            dialog1: {
                frame: import('./_frames/Dialog1'), shower: 'dialog'
            },
        }
    },
}
</script>
