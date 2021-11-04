<template>
    <tst-panel fontsize>

        <div class="q-gutter-y-sm q-mb-md">
            <div>kind:</div>
            <div class="row q-gutter-x-sm">
                <template v-for="c in kinds">
                    <jc-btn :label="c" :kind="c"/>
                </template>
            </div>

            <template v-for="c in kinds">
                <div class="row items-center q-gutter-x-sm" style="border1:1px solid red">
                    <jc-btn :kind="c" label="Кнопка"/>
                    <jc-btn :kind="c" label="Кнопка<a>" type="a"/>
                    <jc-btn :kind="c" label="С иконкой" icon="bus"/>
                    <jc-btn :kind="c" label="С иконкой" icon="mail"/>
                    <jc-btn :kind="c" icon="mail"/>
                    <jc-btn :kind="c" icon="bus"/>
                    <!--                    <q-input :value="'Для масштаба:'+(c?c:'norm')" square outlined/>-->
                    <jc-btn :kind="c" label="С иконкой справа" icon-right="bus"/>
                    <jc-btn :kind="c" label="С иконками" icon="mail" icon-right="bus"/>
                    <jc-btn :kind="c" label="caps" :no-caps="false"/>
                    <div>С иконками (просто текст для сравнения)</div>
                </div>
            </template>
        </div>

        <div class="q-gutter-y-sm q-mb-md">
            <div>href:</div>
            <div class="row q-gutter-x-sm">
                <jc-btn label="local" href="_tst"/>
                <jc-btn label="local blank" href="_tst" target="_blank"/>
                <jc-btn label="yandex" href="http://yandex.ru" target="_blank"/>
            </div>
        </div>

        <div class="q-gutter-y-sm q-mb-md">
            <div>frame:</div>
            <div class="row q-gutter-x-sm">
                <jc-btn label="frame"
                        :frameProps="{prop1:'assigned prop1'}"
                        :showFrame="{frame:import('./_frames/Dialog1'),shower:'dialog'}"/>
            </div>
        </div>

        <div class="q-gutter-y-sm q-mb-md">
            <div>change label and icon (click button):</div>
            <div class="row q-gutter-x-sm">
                <jc-btn :label="label1" :icon="icon1" @click="cnt++"/>
            </div>
        </div>

        <div class="q-gutter-y-sm q-mb-md">
            <div>button ref:</div>
            <div class="row q-gutter-x-sm">
                <jc-btn label="button-ref" ref="button1"/>
                <span>{{ refInfo_button1 }}</span>
            </div>
        </div>

        <div class="q-gutter-y-sm q-mb-md">
            <div>sizes:</div>
            <div class="q-gutter-x-sm">
                <label>jc-btn</label>
                <jc-btn v-for="size in sizes" :size="size" :label="`Size ${size}`"/>
                <jc-btn v-for="size in sizes" color="warning" :size="size" icon="mail"/>
                <jc-btn v-for="size in sizes" color="secondary" round :size="size"
                        icon="mail"/>
            </div>
            <div class="q-gutter-x-sm">
                <label>q-btn</label>
                <q-btn v-for="size in sizes" color="primary" :size="size"
                       :label="`Size ${size}`"/>
                <q-btn v-for="size in sizes" color="warning" :size="size" icon="mail"/>
                <q-btn v-for="size in sizes" color="secondary" round :size="size"
                       icon="mail"/>
            </div>
        </div>

    </tst-panel>
</template>

<script>
import {config as btnConfig} from '../../src/components/btn/JcBtn'
import {tst} from '../vendor'

let btnKinds = []
for (let z in btnConfig.kind) {
    btnKinds.push(z)
}

let icons = ['quasar.arrow.right', 'quasar.arrow.down', 'quasar.arrow.left', 'quasar.arrow.up']

export default {
    mixins: [tst.mixins.cfgStore],
    data() {
        return {
            sizes: ['xs', 'sm', 'md', 'lg', 'xl', 'large-6', 'small-3'],
            cnt: 0,
            refInfo_button1: '',
        }
    },
    mounted() {
        this.refInfo_button1 = this.refInfo('button1')
    },
    methods: {
        refInfo(name) {
            let r = this.$refs[name]
            console.info("ref", name, r);
            if (!r) {
                return `no ref: ${name}`
            }
            if (r instanceof Element) {
                return `html element: ${name}`
            }
            return `comp: ${name}`
        }
    },
    computed: {
        kinds() {
            return btnKinds
        },
        label1() {
            return 'label-' + this.cnt
        },
        icon1() {
            return icons[this.cnt % 4]
        }
    }
}
</script>

