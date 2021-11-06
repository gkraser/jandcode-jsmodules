<template>
    <decor-page>
        <div class="q-gutter-md">
            <div>Иконки air1, picture1</div>
            <div class="q-gutter-x-md">
                <template v-for="n in 6">
                    <q-icon name="air1" :size="n+'em'"/>
                    <q-icon name="picture1" :size="n+'em'"/>
                </template>
            </div>
            <div>Кнопки с иконками air1, picture1</div>
            <div class="q-gutter-x-md">
                <template v-for="n in 3">
                    <jc-btn icon="air1" label="air1" :size="n+'em'"/>
                    <jc-btn icon="picture1" label="picture1" :size="n+'em'"/>
                </template>
            </div>
            <div>Иконка std-air из файла std-icons.js</div>
            <div class="q-gutter-x-md">
                <q-icon name="std-air" size="6em"/>
            </div>
            <div>Иконк quasar.datetime.today из Quasar.iconSet</div>
            <div class="q-gutter-x-md">
                <q-icon name="quasar.datetime.today" size="6em"/>
            </div>
        </div>
    </decor-page>
</template>

<script>
import {apx} from '../vendor'

export default {
    extends: apx.JcFrame,
    created() {
        this.title = 'Иконки'
    },
    frameInit(fw) {
    },
    data() {
        return {}
    },
    methods: {},
}
</script>
