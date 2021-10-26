<template>
    <div class="tst-app">
        <h1>tst app</h1>
        <div class="tst-app__list-modules">
            <table>
                <tr v-for="it in getModuleInfos()">
                    <td><a :href="modRef(it.name)" target="_blank">{{ it.name }}</a></td>
                </tr>
            </table>
        </div>
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
        getModuleInfos() {
            return jcBase.moduleRegistry.getModuleInfos().filter((it) => it.tst == true)
        },
        modRef(mod) {
            return "?module=" + mod
        },
        splitPath(p) {

        }
    },
})
</script>

<style lang="less">

@color-link: navy;

.tst-app {

    a, a:visited {
        color: @color-link;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    &__list-modules {
        font-family: monospace;
    }

}
</style>