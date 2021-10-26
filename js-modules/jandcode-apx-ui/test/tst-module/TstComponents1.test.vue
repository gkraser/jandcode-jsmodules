<template>
    <div>
        <div class="block">
            <span>tst-btn</span>
            <tst-btn label="tst-btn" @click="incCnt"/>
            cnt: {{ cnt }}
        </div>
        <div class="block">
            <span>tst-checkbox</span>
            <tst-checkbox label="tst-checkbox" v-model="checkbox"/>
            <tst-checkbox label="tst-checkbox" v-model="checkbox"/>
            <tst-btn label="change checkbox" @click="checkbox=!checkbox"/>
            checkbox: {{ checkbox }}
        </div>
        <div class="block">
            <span>tst-fontsize</span>
            <tst-fontsize/>
            <span style="font-size: 1rem;">example</span>
        </div>
        <div class="block">
            <span>tst-select</span>
            <tst-select v-model="select1" label="select1" :options="['z1','z2','z3']"/>
            <tst-select v-model="select1" label="select1" :options="['z1','z2','z3']"/>
            <tst-select v-model="select1" label="select1 object"
                        :options="[{value:'z1', label:'ZZZZ1'},{value:'z2', label:'ZZZZ2'},]"/>
            select1: {{ select1 }}
        </div>
    </div>
</template>

<script>
import './vendor'

export default {
    props: {},
    data() {
        return {
            cnt: 0,
            checkbox: false,
            select1: null,
        }
    },
    methods: {
        incCnt(ev) {
            this.cnt++
        }
    },
}
</script>

<style>
.block {
    border: 1px solid silver;
    padding: 4px;
    margin: 8px;
}
</style>