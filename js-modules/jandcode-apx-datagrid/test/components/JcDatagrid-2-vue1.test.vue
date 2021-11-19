<template>
    <tst-panel>
        <div class="row q-gutter-x-md q-mb-md" style="height:550px">
            <jc-panel class="col" body-fit no-padding>
                <jc-datagrid ref="grid1" :options="opt1" class1="col"/>
            </jc-panel>
        </div>
    </tst-panel>
</template>

<script>
import grid1 from './_grids/grid2-vue1'

export default {
    created() {
        this.opt1 = grid1({countRows: 100, parentVueComp: this})
    },
    data() {
        return {}
    },
    mounted() {
        console.info("this", this);
        console.info("this.$root", this.$root);
        console.info("this.$root===this", this.$root === this);
    },
    methods: {}
}
</script>

