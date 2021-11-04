<template>
    <tst-panel>

        <tst-multi-panels>
            <jc-datagrid :options="opt1"/>
        </tst-multi-panels>

    </tst-panel>
</template>

<script>
import '../vendor'
import grid1 from '../components/_grids/grid1'

export default {
    created() {
        this.opt1 = grid1({count:50000})
    },
}
</script>
