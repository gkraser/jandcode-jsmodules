import {apx, Tabulator} from '../vendor'
import css from 'tabulator-tables/dist/css/tabulator_simple.css'

let {h} = apx.Vue

let _tabulatorCssApply = false

/**
 * Простой vue-binding для tabulator.
 *
 * После mount имеется экземпляр gridInst, делайте с ним что хотите.
 */
export default {
    name: 'jc-datagrid',
    props: {

        /**
         * Опции для Tabulator.
         * Это параметры конструктора Tabulator
         * Не нужно передавать сюда реактивные данные,
         * реактивность тут не поддерживается.
         */
        options: {
            type: Object,
            default: null,
            required: true,
        }

    },
    beforeCreate() {
        if (!_tabulatorCssApply) {
            _tabulatorCssApply = true
            apx.jcBase.applyCss(css, 'before-theme')
        }
    },
    mounted() {
        // убираем padding, ибо его ставить нельзя
        this.$el.style.padding = '0'
        this.gridInst = this.createGridInst()
        //
        this.rsw = apx.jcBase.dom.resizeWatch(this.$el, (ev) => {
            let curHeight = this.$refs.table.style.height
            let newHeight = '' + this.calcGridHeight() + 'px'
            if (curHeight !== newHeight) {
                this.gridInst.setHeight(newHeight)
            }
        })
    },
    beforeUnmount() {
        if (this.rsw != null) {
            this.rsw.destroy()
            this.rsw = null
        }
        if (this.gridInst != null) {
            this.gridInst.destroy()
            this.gridInst = null
        }
    },
    render() {
        return h('div', {class: 'jc-datagrid'}, [
            h('div', {ref: 'table'})
        ])
    },
    methods: {
        createGridInst() {
            let opts = Object.assign({}, this.options, {
                height: '' + this.calcGridHeight() + 'px',
            })
            return new Tabulator(this.$refs.table, opts)
        },

        calcGridHeight() {
            let defaultHeight = 150

            let el = this.$el
            let bcr = el.getBoundingClientRect()
            let cst = window.getComputedStyle(el)
            //
            let h = bcr.height // высота вместе с рамкой

            if (h === 0 || !cst.borderBottomWidth || !cst.borderTopWidth) {
                // нет размера
                return defaultHeight
            }

            let bt = parseFloat(cst.borderBottomWidth)
            let bb = parseFloat(cst.borderTopWidth)

            let h1 = h - bt - bb
            if (h1 <= 0) {
                return defaultHeight
            }
            return h1
        }
    },
}
