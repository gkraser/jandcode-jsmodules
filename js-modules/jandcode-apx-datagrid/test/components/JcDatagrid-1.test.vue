<template>
    <tst-panel fontsize>
        <template #tools>
            <tst-btn label="dialog1" @click="dialog1"/>
        </template>

        <div class="row q-gutter-x-md">
            <jc-datagrid :options="opt1" style="height:400px" class="col"/>
            <jc-datagrid :options="opt1" style="height:400px" class="col"/>
        </div>

    </tst-panel>
</template>

<script>
import {apx} from '../vendor'
import grid1 from './_grids/grid1'
import Dialog1 from './_frames/Dialog1'

export default {
    created() {
        this.opt1 = grid1({})
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

