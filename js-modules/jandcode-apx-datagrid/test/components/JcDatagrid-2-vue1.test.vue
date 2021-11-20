<template>
    <tst-panel>
        <q-checkbox label="show grid" v-model="showGrid" style="overflow: hidden"/>
        <div v-if="showGrid" class="row q-gutter-x-md q-mb-md" style="height:250px">
            <jc-panel class="col" body-fit no-padding ref="panel1">
                <jc-datagrid ref="grid1" :options="opt1" class1="col"/>
            </jc-panel>
        </div>
    </tst-panel>
</template>

<script>
import grid1 from './_grids/grid2-vue1'

export default {
    created() {
        this.opt1 = grid1({countRows: 2})
    },
    data() {
        return {
            showGrid: true,
        }
    },
    mounted() {
    },
    methods: {}
}
</script>

