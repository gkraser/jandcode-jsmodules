<template>
    <div class="showerrors1-ee76c43d">
        <div class="row q-gutter-sm">
            <q-btn label="throw new Error('msg')"
                   @click="throwError1"/>
            <q-btn label="error in code"
                   @click="errorInCode1"/>
            <q-btn label="Vue template error"
                   @click="errorInTemplate1"/>
            <q-btn label="axios error"
                   @click="errorAxios1"/>
            <q-btn label="ajax error"
                   @click="errorAjax1"/>
            <q-btn label="promise error"
                   @click="errorPromise1"/>
            <q-btn label="Jc.loadModule error"
                   @click="errorLoadModule1"/>
            <q-btn label="fetch error"
                   @click="errorFetch1"/>
            <q-btn label="fetch error 2"
                   @click="errorFetch2"/>
            <q-btn label="Vue error in render"
                   @click="errorInRender1"/>
        </div>
        <div ref="mountPlace"></div>
    </div>
</template>

<script>
import axios from 'axios'
import {apx} from '../vendor'

export default {
    methods: {
        throwError1() {
            throw new Error('Ошибка возникла!')
        },
        errorInCode1() {
            let a = bbb / ccc
        },
        errorInTemplate1() {
            let vueApp = apx.createVueApp({template: '<div>{{missingProp}/div>',})
            vueApp.mount(this.$refs.mountPlace)
        },
        errorInRender1() {
            let vueApp = apx.createVueApp({template: '<div>{{missingProp}}</div>',})
            vueApp.mount(this.$refs.mountPlace)
        },
        errorAxios1() {
            axios.get('xxx')
        },
        errorAjax1() {
            apx.jcBase.ajax.request({
                url: 'xxx'
            })
        },
        errorPromise1() {
            let p = new Promise(function(reslove) {
                console.info("start promise");
                throw new Error('Ошибка в Promise')
            })
        },
        errorFetch1() {
            fetch('http://1111.22.22.22')
        },
        errorFetch2() {
            fetch('xxx').then(res => {
                if (!res.ok) {
                    throw res
                }
            })
        },
        errorLoadModule1() {
            apx.jcBase.loadModule('xxx')
        },
    }
}
</script>
