<template>
    <tst-panel class="lineheight1-test-292ea539">
        <template #tools>
            <tst-fontsize/>
        </template>

        <template v-for="n in 30">
            <div class="q-mb-md txt-wrap">
                <div>{{ lineHeight(n) }}</div>
                <div class="txt" :style="{lineHeight:lineHeight(n)}">Обычный текст в div
                </div>
                <div class="txt" :style="{lineHeight:lineHeight(n)}">{{ lorem(130) }}
                </div>
                <div class="txt" :style="{lineHeight:lineHeight(n),fontSize:'1.1rem'}">1.1
                    {{ lorem(130) }}
                </div>
                <div class="txt" :style="{lineHeight:lineHeight(n),fontSize:'1.2rem'}">1.2
                    {{ lorem(130) }}
                </div>
                <div class="txt" :style="{lineHeight:lineHeight(n),fontSize:'1.3rem'}">1.3
                    {{ lorem(130) }}
                </div>
                <span class="txt"
                      :style="{lineHeight:lineHeight(n)}">Обычный текст в span</span>
            </div>
        </template>


    </tst-panel>
</template>

<script>
import {tst} from '../vendor'

export default {
    mixins: [tst.mixins.cfgStore, tst.mixins.lorem],
    components: {},

    created() {
        this.cfgStore.applyDefault({})
    },
    data() {
        return {}
    },
    methods: {
        applyCfg() {
            let cfg = this.cfg
        },
        lineHeight(n) {
            return (n - 1) / 20 + 1
        }
    }
}
</script>

<style lang="less">

.lineheight1-test-292ea539 {

    .txt-wrap {
        padding: 10px;
        border: 1px solid silver;
    }

    .txt {
        border: 1px solid green;
        max-width: 20rem;
    }

    div.txt {
        display: inline-block;
    }

}

</style>
