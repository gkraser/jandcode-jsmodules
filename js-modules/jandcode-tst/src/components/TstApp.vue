<template>
    <div>
        <h1>tst app</h1>
        <ul>
            <li v-for="it in getModuleNames()">
                <a :href="modRef(it)">{{ it }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import {jcBase} from '../vendor'

export default defineComponent({
    name: 'tst-app',
    props: {},
    data() {
        return {}
    },
    methods: {
        getModuleNames() {
            return jcBase.moduleRegistry.getModuleNames()
        },
        modRef(mod) {
            return "?module=" + mod
        }
    },
})
</script>
