<template>
    <tst-panel fontsize>
        <template #tools>
            <tst-btn label="dialog1" @click="dialog1"/>
            <span>rows: {{ opt1.data.length }}, cols: {{ opt1.columns.length }}</span>
        </template>

        <tst-multi-panels>
            <jc-datagrid :options="opt1"/>
        </tst-multi-panels>

<!--        <div class="row q-gutter-x-md">-->
<!--            <jc-datagrid :options="opt1" style="height:400px" class="col"/>-->
<!--            <jc-datagrid :options="opt1" style="height:400px" class="col"/>-->
<!--        </div>-->

    </tst-panel>
</template>

<script>
import {apx} from '../vendor'
import grid1 from './_grids/grid1'
import Dialog1 from './_frames/Dialog1'

export default {
    created() {
        this.opt1 = grid1({countRows: 10000, countCols: 50})
    },
    data() {
        return {}
    },
    methods: {
        dialog1() {
            apx.showFrame({
                shower: 'dialog',
                frame: Dialog1
            })
        }
    }
}
</script>

