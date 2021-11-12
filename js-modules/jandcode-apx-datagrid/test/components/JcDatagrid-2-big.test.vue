<template>
    <tst-panel fontsize>
        <div class="row q-gutter-x-md">
            Записей: {{ opt1.data.length }}, колонок: {{ opt1.columns.length }}
        </div>
        <div class="row q-gutter-x-md">
            <jc-datagrid :options="opt1" style="height:555px" class="col"/>
        </div>
    </tst-panel>
</template>

<script>
import '../vendor'
import grid2 from './_grids/grid2'

export default {
    created() {
        this.opt1 = grid2({count: 1000, countCols: 30})
    },
}
</script>

