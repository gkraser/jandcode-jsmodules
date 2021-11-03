<template>
    <decor-dialog body-fit no-padding style="width: 700px;height:400px" _size="max">
        <jc-datagrid :options="frameData.opt1" style1="width:500px"/>
    </decor-dialog>
</template>

<script>
import {apx} from '../vendor'
import grid1 from '../_grids/grid1'

export default {
    extends: apx.JcFrame,
    created() {
        this.title = 'Dialog1'
    },
    frameInit(fw) {
        let {frameData} = fw
        frameData.opt1 = grid1({count1: 20})
    },
}
</script>
