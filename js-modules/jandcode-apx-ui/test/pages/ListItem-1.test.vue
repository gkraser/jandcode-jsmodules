<template>
    <tst-panel>
        <template #tools>
        </template>
        <div class="row">
            <q-list class="col-3" bordered>

                <q-item clickable>
                    <q-item-section>
                        Одна строка
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section side top>
                        <q-icon name="empty"/>
                    </q-item-section>
                    <q-item-section>
                        Одна строка с пустой иконкой
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section side top>
                        <q-icon name="mail"/>
                    </q-item-section>
                    <q-item-section>
                        Одна строка с иконкой
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section side top>
                        <q-icon name="mail" color="positive-700"/>
                    </q-item-section>
                    <q-item-section>
                        Одна строка с иконкой
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section avatar>
                        <q-icon name="mail" color="positive-700"/>
                    </q-item-section>
                    <q-item-section>
                        Одна строка с иконкой avatar
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section side top>
                        <q-icon name="folder1"/>
                    </q-item-section>
                    <q-item-section>
                        Одна строка с иконкой цветной
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section side top>
                        <q-icon name="bus"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label :lines="1">Строка главная</q-item-label>
                        <q-item-label caption>Строка серенькая</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section side top>
                        <q-checkbox v-model="checked1"/>
                    </q-item-section>
                    <q-item-section>
                        Одна строка
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section side top>
                        <q-checkbox v-model="checked1"/>
                    </q-item-section>
                    <q-item-section side top>
                        <q-icon name="mail"/>
                    </q-item-section>
                    <q-item-section>
                        Одна строка с иконкой
                    </q-item-section>
                </q-item>

                <q-item clickable>
                    <q-item-section side top>
                        <q-checkbox v-model="checked1"/>
                    </q-item-section>
                    <q-item-section side top>
                        <q-icon name="bus"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label :lines="1">Строка главная</q-item-label>
                        <q-item-label caption>Строка серенькая</q-item-label>
                    </q-item-section>
                </q-item>

            </q-list>
        </div>
    </tst-panel>
</template>

<script>
import {tst, apx} from '../vendor'

apx.icons.registerIcons({
    'png1': require('../_images/calc.png'),
    'svg1': require('../_images/cpu.svg'),
    'folder1': require('../_images/folder.svg'),
    'file1': require('../_images/file.svg'),
})

export default {
    mixins: [tst.mixins.cfgStore],
    created() {
        this.cfgStore.applyDefault({})
    },
    data() {
        return {
            checked1: false,
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg
        },
    }
}
</script>

