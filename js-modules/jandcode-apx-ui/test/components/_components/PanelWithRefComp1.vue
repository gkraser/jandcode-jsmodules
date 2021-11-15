<template>
    <jc-panel v-bind="$attrs">
        <jc-ref-comp ref="bodyComp1">
            <slot></slot>
        </jc-ref-comp>
    </jc-panel>
</template>

<script>
export default {
    props: {},
    data() {
        return {}
    },
    methods: {
        getInternalPanel() {
            return this.$refs.bodyComp1.getRefComp()
        }
    },
}
</script>
