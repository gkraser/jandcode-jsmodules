<template>
    <div :class="classes">
        <template v-if="custom">
            <slot name="default">
            </slot>
        </template>
        <template v-else>
            <template v-if="hasHeader">
                <jc-panel-bar :title="title">
                    <slot name="toolbar">
                    </slot>
                </jc-panel-bar>
            </template>
            <jc-panel-body :body-fit="bodyFit" :no-padding="noPadding">
                <slot name="default">
                </slot>
            </jc-panel-body>
            <template v-if="$slots.footer">
                <jc-panel-bar>
                    <slot name="footer">
                    </slot>
                </jc-panel-bar>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'jc-panel',
    props: {
        title: {},

        bodyFit: {
            type: Boolean
        },

        noPadding: {
            type: Boolean
        },

        /**
         * При значении true тело панели выводится как есть.
         * В этом случае нужно самому предоставить секции jc-panel-XXX.
         */
        custom: {
            type: Boolean,
        }
    },
    computed: {
        classes() {
            let res = ['jc-panel']
            return res
        },
        hasHeader() {
            return !!this.title || !!this.$slots.toolbar;
        }
    },
}
</script>
