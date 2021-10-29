<template>
    <div :class="classes">
        <div class="jc-toolbar-title__text">{{ text }}</div>
        <template v-if="text2">
            <div class="jc-toolbar-title__text2">{{ text2 }}</div>
        </template>
    </div>
</template>

<script>
let cn = 'jc-toolbar-title'

export default {
    name: cn,
    props: {
        text: {},
        text2: {},
    },
    computed: {
        classes() {
            let res = [cn]
            if (this.text2) {
                res.push(cn + '--has-text2')
            }
            if (this.$attrs.onClick) {
                res.push('cursor-pointer')
            }
            return res
        }
    },
}
</script>
