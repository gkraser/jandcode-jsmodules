let fullscreenClass = 'jc-panel--fullscreen'

export default {
    props: {
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
    provide() {
        return {
            fullscreenOwner: this,
        }
    },
    data() {
        return {
            fullscreenStatus: false,
        }
    },
    methods: {
        toggleFullscreen() {
            this.fullscreenStatus = !this.fullscreenStatus
            if (this.fullscreenStatus) {
                this.placeHolder = this.$el.cloneNode(false)
                this.$el.parentElement.insertBefore(this.placeHolder, this.$el)
                this.$el.classList.toggle(fullscreenClass, this.fullscreenStatus)
            } else {
                this.$el.classList.toggle(fullscreenClass, this.fullscreenStatus)
                this.placeHolder.remove()
            }
            this.$emit('change-fullscreen', this.fullscreenStatus, this)
        },
    }
}
