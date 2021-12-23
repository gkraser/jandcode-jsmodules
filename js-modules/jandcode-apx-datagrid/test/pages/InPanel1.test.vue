<template>
    <tst-panel>

        <template #tools>
            <tst-checkbox label="Скрыть левую панель" v-model="hideLeftPanel"/>
        </template>

        <div class="row q-gutter-x-md q-mb-md" style="height:250px">
            <jc-panel class="col" title="Это просто панель"
                      :style="{display: hideLeftPanel?'none':'block'}">
            </jc-panel>
            <jc-panel class="col" title="Это панель 1" body-fit no-padding>
                <template #toolbar>
                    <jc-action icon="more-v"/>
                    <jc-action icon="bus" label="Привет"/>
                </template>

                <jc-datagrid :options="opt1"/>

                <template #footer>
                    Это footer
                </template>
            </jc-panel>

            <jc-panel class="col" title="Грида" body-fit no-padding>
                <template #toolbar>
                    <jc-action icon="more-v"/>
                    <jc-action icon="bus" label="Привет"/>
                </template>
                <jc-datagrid :options="opt1"/>
            </jc-panel>

            <jc-panel class="col-4" body-fit no-padding>
                <jc-datagrid :options="opt1"/>
            </jc-panel>

        </div>

    </tst-panel>
</template>

<script>
import '../vendor'
import grid1 from '../components/_grids/grid1'

export default {
    created() {
        this.opt1 = grid1({})
    },
    data() {
        return {
            hideLeftPanel: false,
        }
    }
}
</script>
