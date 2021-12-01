<template>
    <tst-panel>
        <div class="q-mb-md">
            <jc-toolbar>
                <jc-menu-builder :items="menu1.items" item-comp="jc-action"
                                 icon-default="mail"/>
            </jc-toolbar>
        </div>
        <div class="q-mb-md" style="width: 20em">
            <jc-side-menu>
                <jc-menu-builder :items="menu1.items" item-comp="jc-side-menu-item"
                                 icon-default="info"/>
            </jc-side-menu>
        </div>
    </tst-panel>
</template>

<script>
import '../vendor'

let menu1 = {
    label: 'menu1',
    items: [
        {
            label: 'Item1',
            onClick: () => {
                console.info("click item1");
            }
        },
        {
            label: 'Item2', items: [
                {
                    label: 'Item3', icon: 'bus',
                },
                {
                    separator: true,
                },
                {
                    label: 'Item3', icon: 'bus',
                },
            ]
        },
        {
            label: 'ShowDialog1',
            showFrame: {frame: import('./_frames/Dialog1'), shower: 'dialog'}
        },
    ]
}

export default {
    created() {
        this.menu1 = menu1
    },
    data() {
        return {}
    },
    methods: {}
}
</script>
