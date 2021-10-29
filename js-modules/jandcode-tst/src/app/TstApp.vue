<template>
    <div class="tst-app">
        <div class="tst-app__title"><a href="?">_tst/webpack</a></div>
        <div class="tst-app__filter" v-if="filter">
            <span>Filter: </span>
            <span>{{ filter }}</span>
        </div>
        <div class="tst-app__list-modules">
            <table>
                <tr v-for="(modData, modName) in buildItems()">
                    <td class="tst-app__module-name">
                        <a :href="filterRef(modName+'/')" class="tst-app__file-name">
                            {{ modName }}
                        </a>
                    </td>
                    <td>
                        <template v-for="(dirData, dirName) in modData">
                            <div class="tst-app__dir-name">{{ dirName }}</div>
                            <div class="tst-app__files">
                                <template v-for="(fileData, fileName) in dirData">
                                    <div>
                                        <a :href="modRef(fileData.name)" target="_blank"
                                           class="tst-app__file-name">
                                            <img :src="fileData.icon">
                                            <span>{{ fileName }}</span>
                                        </a>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import {jcBase} from '../vendor'

import iconJs from '../components/images/js.png'
import iconVue from '../components/images/vue.png'

export default {
    name: 'TstApp',
    props: {
        /**
         * Только модули, которые начинаются с указанной строки
         */
        filter: '',
    },
    methods: {
        modRef(mod) {
            return "?module=" + mod
        },
        filterRef(filter) {
            return "?filter=" + filter
        },
        buildItems() {
            let allItems = jcBase.moduleRegistry.getModuleInfos().filter((it) => it.tst == true)
            if (this.filter) {
                allItems = allItems.filter((it) => it.name.startsWith(this.filter))
            }
            let res = {}
            for (let itOrig of allItems) {
                let it = Object.assign({}, itOrig)
                let moduleName = it.moduleName
                let mod = res[moduleName]
                if (!mod) {
                    mod = {}
                    res[moduleName] = mod
                }
                let pi = jcBase.path.parse(it.filePath)
                let dir = mod[pi.dirname]
                if (!dir) {
                    dir = {}
                    mod[pi.dirname] = dir
                }
                if (pi.ext === 'vue') {
                    it.icon = iconVue
                } else {
                    it.icon = iconJs
                }
                dir[pi.filename] = it
            }
            return res
        }
    },
}
</script>

<style lang="less">

@color-link: navy;
@width-col: 20em;

.tst-app {

    font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;

    padding: 20px;
    padding-bottom: 40px;

    a, a:visited {
        color: @color-link;
        text-decoration: none;
    }

    &__title {
        font-size: 1.2em;
        font-weight: bold;
        padding-bottom: 10px;
    }

    &__filter {
        font-size: 0.9em;
        padding-bottom: 10px;
    }

    &__list-modules {
        font-family: monospace;

        table {
            border-collapse: collapse;
            width: 100%;
        }

        td {
            border: 1px solid silver;
            padding: 8px;
        }

        tr:hover {
            background-color: #fbfbfb;
        }
    }

    &__module-name {
        text-align: left;
        vertical-align: top;
        width: @width-col;
    }

    &__files {
        column-width: @width-col;
        column-count: 4;
        padding-bottom: 12px;
        padding-left: 20px;
    }

    &__dir-name {
        color: gray;
        font-weight: bold;
        font-size: 0.9em;
        padding-bottom: 8px;
    }

    &__file-name {
        display: inline-flex;
        align-items: center;
        padding: 3px;
        min-width: @width-col;
        min-height: 20px;

        img {
            width: 20px;
            height: 20px;
            padding-right: 4px;
            opacity: 0.4;
        }

        &:hover {
            background-color: #e8e8e8;
        }
    }

}
</style>