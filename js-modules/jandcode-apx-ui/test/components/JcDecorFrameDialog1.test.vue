<template>
    <tst-panel class="jcdecorframedialog1-test-35c1590f" debug-bg>
        <template #tools>
            <tst-select v-model="cfg.frameToolbar" :options="toolbarSets"
                        label="frameToolbar"/>
            <tst-checkbox label="title2" v-model="cfg.title2"/>
            <tst-checkbox label="frameIcon" v-model="cfg.frameIcon"/>
            <tst-select v-model="cfg.buttons" :options="dialogButtonGroups"
                        label="buttons"/>

        </template>

        <jc-decor-frame-dialog :ownComp="this" ref="frm" :buttons="buttons">
            <template #toolbar>
                <AppToolbarDemoSet :toolbarSet="cfg.frameToolbar" flat/>
            </template>
            <jc-btn label="Просто кнопка"/>
        </jc-decor-frame-dialog>

    </tst-panel>
</template>

<script>
import {apx, tst} from '../vendor'
import AppToolbarDemoSet, {createToolbarSets} from './_components/AppToolbarDemoSet'

let dialogButtonGroups = []
for (let b in apx.dialogButtonGroups) {
    dialogButtonGroups.push(b)
}

export default {
    mixins: [tst.mixins.cfgStore, apx.JcFrame],
    components: {
        AppToolbarDemoSet,
    },
    props: {
        frameWrapper: {
            default() {
                return new apx.FrameWrapper({})
            }
        }

    },
    created() {
        this.title = 'Заголовок фрейма'

        this.cfgStore.applyDefault({
            frameToolbar: null,
            frameIcon: null,
            title2: null,
            buttons: 'ok-cancel',
        })
    },
    data() {
        return {
            toolbarSets: [null].concat(createToolbarSets()),
            dialogButtonGroups: dialogButtonGroups,
            buttons: 'ok-cancel',
        }
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg

            this.title2 = cfg.title2 ? 'Это такой фрейма подзаголовок' : null;
            this.icon = cfg.frameIcon ? 'bus' : null;
            this.buttons = cfg.buttons;
        },
    }
}
</script>

<style lang="less">

// Отладочные стили
.debug-bg {
    .jc-toolbar {
        background-color: #C6E2A6 !important;
        color: black;

        & > * {
            background-color: #d7edc5;
        }
    }
}

.jcdecorframedialog1-test-35c1590f {


}

</style>
