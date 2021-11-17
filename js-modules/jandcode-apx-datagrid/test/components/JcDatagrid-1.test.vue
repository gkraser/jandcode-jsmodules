<template>
    <tst-panel fontsize>
        <template #tools>
            <tst-btn label="dialog1" @click="dialog1"/>
            <tst-btn label="export" @click="export1"/>
            <span>rows: {{ countRows }}, cols: {{ countCols }}</span>
        </template>

        <tst-multi-panels :panelProps="{noPadding: true}">
            <jc-datagrid ref="grid1" :options="opt1"/>
        </tst-multi-panels>

    </tst-panel>
</template>

<script>
import {apx, apxDatagrid} from '../vendor'
import grid1 from './_grids/grid1'
import Dialog1 from './_frames/Dialog1'

console.info("API apxDatagrid", apxDatagrid);
console.info("column types", apxDatagrid.getColumnTypes());

export default {
    created() {
        this.opt1 = grid1({countRows: 10, countCols: 2, pinnedColumns: 2})
        //this.opt1 = grid1({countRows: 10000, countCols: 2, pinnedColumns: 1})
        // this.opt1 = grid1({countRows: 2, countCols: 1})
    },
    data() {
        return {
            countRows: 0,
            countCols: 0,
        }
    },
    mounted() {
        this.$nextTick(() => {
            let grid = this.$refs.grid1.getDatagrid()
            this.countRows = grid.getData().getRows().length
            this.countCols = grid.getColumnsFlat().length

            this.export1()
        })
    },
    methods: {
        dialog1() {
            apx.showFrame({
                shower: 'dialog',
                frame: Dialog1
            })
        },
        export1() {
            let datagrid = this.$refs.grid1.getDatagrid()
            let exdata = datagrid.exportData()
            console.info(exdata);
        }

    }
}
</script>

<style lang="less">

.color-red {
    color: red;
}

.color-green {
    color: green;
}

.color-blue {
    color: blue;
}

.part-link {
    font-size: 0.8em;
    text-decoration: underline;
    cursor: pointer;
    color: navy;
}

</style>
