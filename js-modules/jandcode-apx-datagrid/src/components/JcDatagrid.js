import {apx} from '../vendor'
import {Datagrid} from '../datagrid'
import {AgDatagridDriver} from '../ag'

import agGridCss from 'ag-grid-community/dist/styles/ag-grid.css'
import agGridCss_theme from 'ag-grid-community/dist/styles/ag-theme-balham.css'

let {h} = apx.Vue

let _themeApply = false
let themeName = 'ag-theme-balham'

/**
 * Реализация datagrid по умолчанию, на основе ag-grid.
 */
export default {
    name: 'jc-datagrid',
    props: {

        /**
         * Опции для создания {@link Datagrid} или экземпляр {@link Datagrid}.
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
        if (!_themeApply) {
            _themeApply = true
            apx.jcBase.applyCss(agGridCss, 'before-theme')
            apx.jcBase.applyCss(agGridCss_theme, 'before-theme')
        }
    },
    mounted() {
        this.__driver = new AgDatagridDriver({el: this.$refs.table})
        this.getDatagrid().setDriver(this.__driver)
    },
    beforeUnmount() {
        if (this.__driver != null) {
            this.__driver.destroy()
            this.__driver = null
        }
        if (this.__datagrid != null) {
            this.__datagrid.destroy()
            this.__datagrid = null
        }
    },
    render() {
        return h('div', {class: 'jc-datagrid'}, [
            h('div', {
                class: [themeName], ref: 'table', 'data-ag-grid-place': true
            })
        ])
    },
    methods: {
        /**
         * Экземпляр {@link Datagrid}
         * @return {Datagrid}
         */
        getDatagrid() {
            if (this.__datagrid != null) {
                return this.__datagrid
            }
            if (this.options instanceof Datagrid) {
                return this.options
            }
            this.__datagrid = new Datagrid(this.options)
            return this.__datagrid
        },
    },
}
