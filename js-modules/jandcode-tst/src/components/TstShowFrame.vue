<template>
    <div>
        <teleport to="#tst-tools" v-if="teleport1">
            <tst-select label="frames" v-model="curFrame" :options="frameKeys"/>
        </teleport>

        <jc-decor-app-std container class="tst-body-fit"
                          :ownComp="this">
        </jc-decor-app-std>
    </div>
</template>

<script>
import {apx} from '../vendor'
import cfgStoreMixin from '../mixins/cfg-store'

/**
 * Показ фрейма в интерфейсе приложения.
 * Можно использовать для отладки макетов фреймов в контексте приложения.
 */
export default {
    name: 'tst-show-frame',
    mixins: [cfgStoreMixin, apx.JcApp],
    props: {
        /**
         * Набор фреймов для показа.
         * @example
         * frames = {
         *   frame1: {frame: import('./FrameMaket-1'), props:{prop1:'111'}},
         *   frame2: {frame: import('./FrameMaket-2'), props:{prop1:'222'}, shower:'dialog'},
         * }
         */
        frames: {
            type: Object,
            required: true
        },

    },
    data() {
        return {
            /**
             * Телепорт во вне этого компонента в место, которое еще не существует.
             * Поэтому сначала он не видим, а после первой отрисовки делаем видимым.
             */
            teleport1: false,
        }
    },
    created() {
        this.title = 'Приложение'
        this.cfgStore.applyDefault({
            curFrame: null,
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.teleport1 = true
        })
        this.doShowFrame()
    },
    computed: {
        curFrame: {
            get() {
                let s = this.cfg.curFrame
                if (!s) {
                    let k = this.frameKeys
                    if (k.length > 0) {
                        s = k[0]
                    }
                }
                return s
            },
            set(v) {
                this.cfg.curFrame = v
            }
        },
        frameKeys() {
            return Object.keys(this.frames)
        }
    },
    methods: {
        applyCfg() {
            this.$nextTick(() => {
                this.doShowFrame()
            })
        },
        doShowFrame() {
            let s = this.curFrame
            if (!s) {
                return
            }
            let fopt = this.frames[this.curFrame]
            if (!fopt) {
                return
            }
            if (this.__last__showFrameOptions === fopt) {
                return
            }
            this.__last__showFrameOptions = fopt
            let opts = Object.assign({}, fopt)
            apx.showFrame(opts)
        },
    },
}
</script>
