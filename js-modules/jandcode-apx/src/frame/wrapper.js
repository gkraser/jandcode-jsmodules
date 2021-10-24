import {jcBase, Vue} from '../vendor'

/**
 * Обертка вокруг vue-компонента фрейма.
 */
export class FrameWrapper {

    constructor(options) {
        // уникальный id экземпляра
        this.id = jcBase.nextId("jc-frame-wrapper-")

        // опции, который были переданы в showFrame
        this.options = Object.assign({}, options)
        this.options.props = Object.assign({}, this.options.props)
        this.options.props.frameWrapper = Vue.markRaw(this)

        // ссылка на shower, который будет показывать этот фрейм
        this.shower = null

        // vue приложение для этого фрейма (создано через createVueApp)
        this.vueApp = null

        // экземпляр vue (создано через vueApp.mount(vueMountEl)
        this.vueInst = null

        // el, куда примонтирован экземпляр vue
        this.vueMountEl = null
    }

    /**
     * Свойства для показа фрейма
     * @return {Object}
     */
    get props() {
        return this.options.props
    }

    /**
     * Уничтожить фрейм
     */
    destroy() {
        if (this.vueApp != null) {
            this.vueApp.unmount()
        }
        if (this.options != null && this.options.props != null) {
            this.options.props.frameWrapper = null
        }
        this.options = null
        this.shower = null
        this.vueApp = null
        this.vueInst = null
        if (this.vueMountEl != null) {
            this.vueMountEl.remove()
        }
        this.vueMountEl = null
    }
}
