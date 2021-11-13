<template>
    <decor-dialog body-fit no-padding style="width: 700px;height:400px" _size="max">
        <jc-datagrid :options="frameData.opt1"/>
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
        frameData.opt1 = grid1({countRows: 20})
    },
}
</script>
