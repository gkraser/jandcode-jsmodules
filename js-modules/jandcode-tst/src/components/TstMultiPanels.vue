<template>
    <div>
        <teleport to="#tst-tools" v-if="teleport1">
            <q-separator vertical/>
            <tst-select v-model="cfgMy.count" :options="countSets"
                        label="count"/>
            <tst-select v-model="cfgMy.height" :options="heightSets"
                        label="height"/>
            <tst-checkbox label="paddingLeft" v-model="cfgMy.paddingLeft"/>
        </teleport>

        <div class="row q-gutter-x-md q-mb-md" :style="bodyStyle">
            <template v-for="n in panels" :key="uniKey(n)">
                <component :is="panelComp" :title="titleForNum(n)" class="col"
                           body-fit>
                    <slot name="default">
                        <div>No content for slot default in tst-multi-panels!</div>
                    </slot>
                </component>
            </template>
        </div>

    </div>
</template>

<script>
import * as mixins from '../mixins'
import {apx} from '../vendor'

export default {
    name: 'tst-multi-panels',
    mixins: [mixins.cfgStore],
    components: {},
    props: {
        cfgKey: {
            default: 'panels'
        },

        title: {
            default: 'Панель'
        },

        panelComp: {
            default: 'jc-panel'
        }

    },
    created() {
        this.cfgStore.applyDefault({
            [this.cfgKey]: {
                count: '1',
                height: '300px',
                paddingLeft: false
            }
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.teleport1 = true
        })
    },
    data() {
        return {
            /**
             * key для отслеживания необходимости перерисовки компонента.
             * Учавствует в построении ключа в v-for. Если его изменить,
             * то все компоненты полностью перерисуются. Без этого chart не реагирует
             * на уменьшение высоты.
             */
            key: 0,

            /**
             * Телепорт во вне этого компонента в место, которое еще не существует.
             * Поэтому сначала он не видим, а после первой отрисовки делаем видимым.
             */
            teleport1: false,

            countSets: ['1', '2', '3', '4', '5'],
            panels: [],
            heightSets: ['100px', '200px', '300px', '400px', '500px'],
            panelHeight: '',
            bodyStyle: {},
            paddingLeftValue: '300px',
        }
    },
    computed: {
        cfgMy() {
            return this.cfg[this.cfgKey]
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfgMy
            //
            let count = apx.jcBase.toInt(cfg.count, 1)
            let panels = []
            for (let i = 1; i <= count; i++) {
                panels.push('panel-' + i)
            }
            this.panels = panels
            this.panelHeight = cfg.height
            //
            let bodyStyle = {
                height: cfg.height
            }
            if (cfg.paddingLeft) {
                bodyStyle.paddingLeft = this.paddingLeftValue
            }
            this.bodyStyle = bodyStyle

            this.key++
        },

        // уникальный ключ для использования в цикле отрисовки
        // без него не реагирует на изменения высоты
        uniKey(n) {
            // добавляем this.key, тогда при смене key все будет перерисовано
            return n + '-' + this.key
        },

        /**
         * Заголовок для панели номер n
         */
        titleForNum(n) {
            if (this.panels.length <= 1) {
                return this.title
            }
            return this.title + ' (' + n + ')'
        },

    },
}
</script>
