import {FrameShower} from './shower'
import {Vue, jcBase} from '../vendor'

const {h} = Vue

/**
 * Показ фрейма как страницы
 */
export class FrameShower_page extends FrameShower {

    constructor(own) {
        super()
        /**
         * Экземпляр JcFrameShowerPage, который создал этот shower
         */
        this.own = own

        // текущие фреймы
        this._frames = []
    }

    async showFrameWrapper(fw) {
        if (this._frames.length === 0) {
            // первый фрейм
            this._frames.push(fw)
            this.own.mountFrame(fw)
        } else if (this._frames.length === 1) {
            // замена фрейма
            let lastFw = this._frames.pop()
            this._frames.push(fw)
            this.own.mountFrame(fw)
            lastFw.destroy()
        }
    }

}

/**
 * vue компонент для указания местоположения shower.
 * @type {{}}
 */
export default {
    name: 'jc-frame-shower-page',

    props: {
        /**
         * Синхронизировать ли min-height с родительским элементом.
         * По умолчанию - true.
         */
        syncMinHeight: {
            type: Boolean,
            default: true,
        },

        /**
         * Имя shower
         */
        name: {
            type: String,
            default: 'main'
        }
    },

    mounted() {
        this.shower = new FrameShower_page(this)
        this.lastMountedFw = null
        jcBase.app.frameManager.registerShower(this.name, this.shower)
    },

    unmounted() {
        this.unmountFrame()
        jcBase.app.frameManager.unregisterShower(this.name)
        this.shower = null
    },

    render() {
        return h('div', {
            class: ['jc-frame-shower-page', 'jc-frame-shower-page--' + this.name],
            style: 'display:none;'
        })
    },

    methods: {

        /**
         * Примонтировать фрейм
         */
        mountFrame(fw) {
            this.unmountFrame()
            if (fw == null) {
                return
            }
            // добавляем el фрейма как первый элемент в parentNode
            this.$el.parentNode.prepend(fw.vueInst.$el)
            this.lastMountedFw = fw
        },

        /**
         * Отмонтировать текущий показываемый фрейм.
         */
        unmountFrame() {
            if (this.lastMountedFw == null) {
                return
            }
            // возвращаем el фрейма туда, откуда взяли
            this.lastMountedFw.vueMountEl.appendChild(this.lastMountedFw.vueInst.$el)
            this.lastMountedFw = null
        }

    }
}