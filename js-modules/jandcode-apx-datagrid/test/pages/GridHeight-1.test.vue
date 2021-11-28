<template>
    <tst-panel>

        <div style="border:1px solid green">
            <jc-datagrid :options="opt1" grid-height="25row"/>
        </div>

    </tst-panel>
</template>

<script>
import '../vendor'
import grid1 from '../components/_grids/grid1'

export default {
    created() {
        this.opt1 = grid1({countCols:10, countRows:20})
    },
}
</script>
