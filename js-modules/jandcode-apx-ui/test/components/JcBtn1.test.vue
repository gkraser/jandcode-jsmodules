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
                    <div>С иконками (просто текст для сравнения)</div>
                </div>
            </template>
        </div>

        <div class="q-gutter-y-sm q-mb-md">
            <div>href btn:</div>
            <div class="row q-gutter-x-sm">
                <jc-btn label="local" href="_tst"/>
                <jc-btn label="local blank" href="_tst" target="_blank"/>
                <jc-btn label="yandex" href="http://yandex.ru" target="_blank"/>
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

export default {
    mixins: [tst.mixins.cfgStore],
    data() {
        return {}
    },
    computed: {
        kinds() {
            return btnKinds
        }
    }
}
</script>

