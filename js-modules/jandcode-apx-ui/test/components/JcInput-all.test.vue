<template>
    <tst-panel fontsize>

        <div class="row items-center q-gutter-x-md q-mb-lg">
            <jc-input-text v-model="str1"/>
            <jc-input-text v-model="str1"/>
            <jc-btn label="Для масштаба"/>
            <jc-btn icon="bus"/>
            <jc-btn label="change model" @click="str1='332211'"/>
            <div>jc-inp-str</div>
            <q-checkbox v-model="bool" label="Метка справа"/>
            <div>model:[{{ str1 }}]</div>
        </div>

    </tst-panel>
</template>

<script>
import {tst} from '../vendor'

export default {
    mixins: [tst.mixins.cfgStore],
    created() {
        this.cfgStore.applyDefault({})
    },
    data() {
        return {
            bool: true,
            str1: '',
            passwd1: '',
            date1: '1999-12-23',
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg
        },
    }
}
</script>

