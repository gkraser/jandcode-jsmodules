import {apx} from './vendor'
import Map from 'ol/Map'

let {h} = apx.Vue

/**
 * Простой vue-binding для openlayers.
 *
 * После mount имеется экземпляр mapInst, делайте с ним что хотите.
 */
export default {
    name: 'jc-map',
    props: {

        /**
         * Опции для openlayers.
         * Это параметры конструктора ol.Map
         * Не нужно передавать сюда реактивные данные,
         * реактивность тут не поддерживается.
         * target указывать не надо.
         */
        options: {
            type: Object,
            default: null,
            required: true,
        }

    },
    mounted() {
        this.mapInst = this.createMapInst()
        //
        this.rsw = apx.jcBase.dom.resizeWatch(this.$el, (ev) => {
            this.mapInst.updateSize()
        })
    },
    beforeUnmount() {
        this.rsw.destroy()
        this.rsw = null
        this.mapInst.setTarget(null)
        this.mapInst = null
    },
    render() {
        return h('div', {class: 'jc-map'})
    },
    methods: {
        createMapInst() {
            let opts = Object.assign({}, this.options)
            opts.target = this.$el
            return new Map(opts)
        }
    },
}
