<template>
    <div class="tst-fontsize">
        <span>font-size:</span>
        <input type="range" :min="fontSizeMin" :max="fontSizeMax"
               v-model.number="fontSize">
        <span class="tst-fontsize__size">{{ fontSize }}px</span>
        <button @click="changeFontSize(-1)">-</button>
        <button @click="changeFontSize(1)">+</button>
        <button @click="fontSize=13">13</button>
        <button @click="fontSize=14">14</button>
        <button @click="fontSize=16">16</button>
        <button @click="fontSize=24">24</button>
    </div>
</template>

<script>
import {jcBase} from '../vendor'

export default {
    name: "tst-fontsize",
    props: {},
    data() {
        return {
            fontSizeMin: 8,
            fontSizeMax: 38,
            fontSize: 13,
        }
    },
    created() {
        let fs = jcBase.toInt(window.getComputedStyle(document.documentElement).fontSize)
        if (fs) {
            this.fontSize = fs
        }
    },
    watch: {
        fontSize: function(v) {
            document.documentElement.style.fontSize = '' + this.fontSize + 'px';
        },
    },
    methods: {
        changeFontSize(inc) {
            let v = this.fontSize + inc
            if (v >= this.fontSizeMin && v <= this.fontSizeMax) {
                this.fontSize = v;
            }
        },
    },
}
</script>

<style>
.tst-fontsize {
    display: flex;
    align-items: center;
}

.tst-fontsize .tst-fontsize__size {
    padding-left: 4px;
    padding-right: 4px;
}
</style>