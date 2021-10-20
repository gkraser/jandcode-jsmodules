import {FrameShower, registerShower, unregisterShower} from './fm'
import {Vue} from '../vendor'

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
    }

    async showFrameWrapper(fw) {
        this.own.mountFrame(fw)
    }

}

/**
 * vue компонент для указания местоположения shower
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

    created() {
        this.shower = new FrameShower_page(this)
    },

    mounted() {
        registerShower(this.name, this.shower)
    },

    unmounted() {
        unregisterShower(this.name)
        this.shower = null
    },

    computed: {
        classes() {
            return ['jc-frame-shower-page', 'jc-frame-shower-page--' + this.name]
        },
    },

    render() {
        return h('div', {class: this.classes, style: 'display:none;'})
    },

    methods: {
        mountFrame(fw) {
            let frameBodyEl = fw.vueInst.$el
            let showerBodyEl = this.$el
            showerBodyEl.appendChild(frameBodyEl)
            showerBodyEl.style.display = 'block'
        }
    }
}