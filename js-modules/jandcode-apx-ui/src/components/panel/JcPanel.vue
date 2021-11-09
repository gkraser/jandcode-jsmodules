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
                    <jc-action v-show="toolFullscreen"
                               :icon="fullscreen?'fullscreen-close':'fullscreen-open'"
                               @click="toggleFullscreen()"
                               :tooltip="fullscreen?'Уменьшить':'Увеличить'"/>
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
        },

        /**
         * При значении true появляется инструмент "fullscreen", для распахивания
         * панели во весь экран
         */
        toolFullscreen: {
            type: Boolean,
        }
    },
    emits: {
        'change-fullscreen': {}
    },
    data() {
        return {
            fullscreen: false,
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
    methods: {
        toggleFullscreen() {
            this.fullscreen = !this.fullscreen
            if (this.fullscreen) {
                this.placeHolder = this.$el.cloneNode(false)
                this.$el.parentElement.insertBefore(this.placeHolder, this.$el)
                this.$el.classList.toggle('jc-panel--fullscreen', this.fullscreen)
            } else {
                this.$el.classList.toggle('jc-panel--fullscreen', this.fullscreen)
                this.placeHolder.remove()
            }
            this.$emit('change-fullscreen', this.fullscreen, this)
        },
    }
}
</script>
