import {jcBase, Vue} from '../vendor'
import mitt from 'mitt'

/**
 * Обертка вокруг vue-компонента фрейма.
 */
export class FrameWrapper {

    /**
     * @param options опции, которые были переданы в showFrame
     */
    constructor(options) {
        // уникальный id экземпляра
        this.id = jcBase.nextId("jc-frame-wrapper-")

        // опции, который были переданы в showFrame
        this.options = Object.assign({}, options)

        // свойства для показа фрейма
        this.props = Object.assign({}, this.options.props)

        // ставим себя в свойства
        this.props.frameWrapper = Vue.markRaw(this)

        // заказанный фрейм: строка или компонент
        this.frame = this.options.frame

        // данные для фрейма, заполняются в методе frameInit
        this.frameData = {}

        // если фрейм заресолвился через router, тут информация об этом
        this.routeInfo = null

        // ссылка на shower, который будет показывать этот фрейм
        this.shower = null

        // vue приложение для этого фрейма (создано через createVueApp)
        this.vueApp = null

        // экземпляр vue (создано через vueApp.mount(vueMountEl)
        this.vueInst = null

        // el, куда примонтирован экземпляр vue
        this.vueMountEl = null

        // события
        // show - фрейм показан на экране
        // hide - фрейм убран с экрана
        this.eventBus = mitt()
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
        if (this.props != null) {
            this.props.frameWrapper = null
        }
        this.options = null
        this.props = null
        this.frame = null
        this.shower = null
        this.routeInfo = null
        this.vueApp = null
        this.vueInst = null
        if (this.vueMountEl != null) {
            this.vueMountEl.remove()
        }
        this.vueMountEl = null
        if (this.eventBus != null) {
            this.eventBus.all.clear()
            this.eventBus = null
        }
    }

    //////

    /**
     * Закрыть фрейм с указанной командой
     * @param cmd
     */
    close(cmd) {
        this.shower.closeFrameWrapper(this, cmd)
    }

    /**
     * Возвращает true, если фрейм возможно закрыть.
     * Например диалог всегда можно закрыть,
     * а фрейм на main - только если он не первый в стеке.
     */
    isClosable() {
        return this.shower.isFrameWrapperClosable(this)
    }

    //////

    /**
     * Возвращает path (вместе с параметрами), который можно использовать
     * в hash для ссылки на показ этого фрейма.
     * Возвращает null, если этот фрейм не доступен через router.
     */
    getRouteHash() {
        if (this.vueInst == null) {
            return null
        }
        if (this.routeInfo == null) {
            return null
        }
        let res = this.routeInfo.path
        let prms = {}
        for (let p in this.vueInst.$props) {
            if (p in this.routeInfo.urlParams) {
                continue // этот параметр и так есть в url
            }
            let v = this.vueInst.$props[p]
            // берем только простые значения
            if (jcBase.isString(v) || jcBase.isNumber(v) || jcBase.isBoolean(v)) {
                prms[p] = v
            }
        }
        let qs = jcBase.url.params(prms)
        if (qs !== '') {
            res = res + '?' + qs
        }
        return res
    }

    //////

    /**
     * Заголовок фрейма
     */
    getTitle() {
        let res = this.vueInst.title
        if (!res) {
            res = ''
        }
        return res
    }

    /**
     * Короткий заголовок фрейма
     */
    getTitleShort() {
        let res = this.vueInst.titleShort
        if (!res) {
            res = this.getTitle()
        }
        return res
    }

}
