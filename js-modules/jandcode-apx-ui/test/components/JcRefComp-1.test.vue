<template>
    <tst-panel>

        <jc-btn label="get ref to 'panel in slot'" @click="click1"/>
        <jc-btn label="fullscreen1'" @click="fullscreen1"/>

        <PanelWithRefComp1 ref="comp1" title="own panel">
            <jc-panel :title="titlePanel1" ref="panel1" tool-fullscreen/>
        </PanelWithRefComp1>

    </tst-panel>
</template>

<script>
import '../vendor'
import PanelWithRefComp1 from './_components/PanelWithRefComp1'

export default {
    components: {
        PanelWithRefComp1
    },
    data() {
        return {
            titlePanel1: 'panel in slot'
        }
    },
    methods: {
        click1() {
            this.titlePanel1 = 'change:' + this.titlePanel1
            this.$nextTick(() => {
                let p = this.$refs.comp1.getInternalPanel()
                console.info("panel in slot", p);
                console.info("this", this);
                console.info("panel title", p.title);
                console.info("panel title here", this.$refs.panel1.title);
            })
        },
        fullscreen1() {
            this.$refs.comp1.getInternalPanel().toggleFullscreen()
        },
    }
}
</script>
