<template>
    <tst-panel fontsize>
        <template #tools>
            <tst-btn label="dialog1" @click="dialog1"/>
            <tst-btn label="export" @click="export1"/>
            <span>rows: {{ opt1.data.length }}, cols: {{ opt1.columns.length }}</span>
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
        //this.opt1 = grid1({countRows: 10000, countCols: 50})
        this.opt1 = grid1({countRows: 2, countCols: 1})
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
        },
        export1() {
            let grid1 = this.$refs.grid1
            let s=grid1.getDatagrid().exportData()
            console.info("s",s);
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
