<template>
    <div class="tst-app">

        <nav class="navbar is-light is-fixed-top">

            <a class="navbar-item is-size-4" href="?">
                <div class="is-flex is-align-items-center">
                    <img class="mr-2" src="../../assets/images/tst-logo.svg" width="32">
                    <div>_tst/frontend</div>
                </div>
            </a>

            <div class="navbar-brand">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Tools
                    </a>

                    <div class="navbar-dropdown">
                        <a v-for="it in toolItems" class="navbar-item"
                           :href="modRef(it.name)" target="_blank">
                            {{ it.label }}
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <div class="container is-fluid tst-app__main-content">

            <div class="block is-flex is-align-items-center">
                <label class="mr-2 is-small111 is-size-7">Filter:</label>
                <input class="input is-small mr-2" type="text"
                       v-model="filterValue" size="20" style="width:200px">
                <button class="button is-small mr-2 is-info is-light"
                        @click="filterValue=''">
                    Clear filter
                </button>
                <a class="button is-small mr-2 is-text" :href="filterRef(filterValue)">
                    Reload with filter
                </a>
            </div>

            <table
                class="table is-bordered is-narrow is-family-code tst-app__list-modules">
                <tbody>
                <tr v-for="(modData, modName) in moduleItems">
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
                                        <a :href="modRef(fileData.name)"
                                           target="_blank"
                                           :title="fileData.name"
                                           class="tst-app__file-name">
                                            <img :src="fileData.icon">
                                            <span>{{ fileData.shortName }}</span>
                                        </a>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>

    </div>
</template>

<script>
import {jcBase} from '../vendor'

import iconJs from '../../assets/images/js.png'
import iconVue from '../../assets/images/vue.png'
import bulmaCss from 'bulma/css/bulma.css'
import '../tools'

export default {
    name: 'TstApp',
    props: {
        /**
         * Только модули, которые начинаются с указанной строки
         */
        filter: '',
    },
    created() {
        jcBase.applyCss(bulmaCss)
        document.body.classList.add('has-navbar-fixed-top') // требует bulma
        this.filterValue = this.filter
    },
    data() {
        return {
            filterValue: '',
        }
    },
    methods: {
        modRef(mod) {
            return "?module=" + mod
        },
        filterRef(filter) {
            return "?filter=" + filter
        },
    },
    computed: {
        moduleItems() {
            let allItems = jcBase.moduleRegistry.getModuleInfos().filter((it) => it.tst == true)
            if (this.filterValue) {
                let filter = this.filterValue.toLowerCase()
                allItems = allItems.filter((it) => {
                    let s = it.name.toLowerCase()
                    return s.indexOf(filter) != -1
                })
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
                it.shortName = pi.basename
                let pi2 = jcBase.path.parse(it.shortName)
                if (pi2.ext === 'test') {
                    it.shortName = pi2.basename
                }
                dir[pi.filename] = it
            }
            return res
        },
        toolItems() {
            let allItems = jcBase.moduleRegistry.getModuleInfos().filter((it) => it.name.startsWith('tst/tools/'))
            let res = []
            for (let itOrig of allItems) {
                let it = Object.assign({}, itOrig)
                if (!it.label) {
                    it.label = it.name
                }
                res.push(it)
            }
            return res
        }
    }
}
</script>

<style lang="less">

@color-link: navy;
@width-col: 18em;

.tst-app {

    &__list-modules {
        font-size: 0.8em;

        a, a:visited {
            color: @color-link;
        }

        td {
            padding: 8px;
        }
    }

    &__main-content {
        padding-bottom: 2rem;
        padding-top: 1rem;
    }

    &__module-name {
        text-align: left;
        vertical-align: top;
        width: @width-col;
    }

    &__files {
        column-count: 4;
        padding-bottom: 6px;
        padding-left: 20px;
    }

    &__dir-name {
        color: gray;
        font-weight: bold;
        font-size: 0.8em;
        padding-top: 8px;
        padding-left: 12px;
        padding-bottom: 2px;
    }

    &__file-name {
        display: inline-flex;
        align-items: center;
        padding: 3px;
        width: 100%;
        min-height: 20px;

        img {
            width: 20px;
            padding-right: 4px;
            opacity: 0.7;
        }

        &:hover {
            background-color: #e8e8e8;
        }
    }

}

</style>