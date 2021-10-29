<template>
    <div :class="classes">
        <slot name="default">
        </slot>
    </div>
</template>

<script>
export default {
    name: 'JcPanelBody',
    props: {
        bodyFit: {
            type: Boolean
        },
        noPadding: {
            type: Boolean
        }
    },
    computed: {
        classes() {
            let res = ['jc-panel__body']
            if (this.bodyFit) {
                res.push('jc-panel__body--fit')
            }
            if (!this.noPadding) {
                res.push('jc-panel__body--padding')
            }
            return res
        },
    },
}
</script>
