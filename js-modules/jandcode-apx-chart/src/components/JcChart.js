import {apx, echarts} from '../vendor'
import * as chartHolder from '../utils/chart-holder'

let {h} = apx.Vue

function getLocale() {
    return apx.jcBase.lang.getLang().toUpperCase()
}

/**
 * Получить тему для JcChart.
 * Приоритет: определенная в JcChart, определенная в Chart, cfg, 'default'
 * @param jcChart
 * @return {string|string|{default: null, type: String | StringConstructor}|*}
 */
function getTheme(jcChart) {
    return jcChart.theme || jcChart.options.theme || apx.jcBase.cfg.echarts.theme || 'default'
}

/**
 * Простой vue-binding для echarts.
 *
 * После mount имеется экземпляр chartInst, делайте с ним что хотите.
 *
 */
export default {
    name: 'jc-chart',
    props: {

        /**
         * Опции для echart.
         * Это параметры метода echarts.setOption
         * Не нужно передавать сюда реактивные данные,
         * реактивность тут не поддерживается.
         *
         * В качестве значения можно передать:
         *
         * 1) простой объект с параметрами диаграммы, как прописано в документации echarts
         * 2) экземпляра класса Chart
         *
         * Следует иметь ввиду, что экземпляр диаграммы может рендерится столько раз,
         * сколько захочет vue. Так что, getOptions у Chart может вызыватся много раз,
         * и для разных экземпляров vue.
         */
        options: {
            type: Object,
            default: null,
        },

        /**
         * Тема echarts для этого графика.
         * Если не указано, берется из Chart.theme или Jc.cfg.echarts.theme
         */
        theme: {
            type: String,
            default: null
        },

        /**
         * Высота диаграммы для первоначального рендеринга
         */
        height: {
            default: 200,
        }

    },


    emmits: {

        /**
         * см. {@link Chart.setChartInst}
         */
        'set-chart-inst': null,

        /**
         * см. {@link Chart.destroyChartInst}
         */
        'destroy-chart-inst': null,
    },

    mounted() {
        let defaultHeight = this.defaultHeight = 200
        let defaultWidth = this.defaultWidth = 300
        //
        let chartInst = this.__createChartInst()
        //
        this.$nextTick(() => {
            // приходится.. Если сразу el=(0,0), то потом никто ему размер не меняет
            let bcr = this.$el.getBoundingClientRect()
            if (bcr.height === 0 && bcr.width === 0) {
                this.$el.style.width = '' + defaultWidth + 'px'
                this.$el.style.height = '' + defaultHeight + 'px'
            }
            this.__setChartInst(chartInst)
        })

        this.chartInst = chartInst

        this.rsw = apx.jcBase.dom.resizeWatch(this.$el, (ev) => {
            this.syncSize()
        })

        chartHolder.registerChart(this)
    },

    beforeUnmount() {
        chartHolder.unregisterChart(this)
        if (this.chartInst != null) {
            this.__destroyChartInst(this.chartInst)
        }
        if (this.rsw != null) {
            this.rsw.destroy()
            this.rsw = null
        }
        if (this.chartInst != null) {
            this.chartInst.dispose()
            this.chartInst = null
        }
    },

    render() {
        return h('div', {class: 'jc-map', style: this.style})
    },

    computed: {
        style() {
            return {
                height: apx.jcBase.dom.toStyleSize(this.height)
            }
        },

    },

    methods: {

        syncSize() {
            let bcr = this.$el.getBoundingClientRect()
            let newHeight = null
            let newWidth = null
            if (bcr.height === 0) {
                newHeight = this.defaultHeight
            }
            if (bcr.width === 0) {
                newWidth = this.defaultWidth
            }
            this.chartInst.resize({height: newHeight, width: newWidth})
        },

        /**
         * Создает экземпляр echarts
         */
        __createChartInst() {
            let theme = getTheme(this)
            let locale = getLocale()
            let chartInst = echarts.init(this.$el, theme, {
                locale: locale,
            })
            chartInst.setOption(this.__getOptions())
            return chartInst
        },

        /**
         * Опции для диаграммы
         */
        __getOptions() {
            if (!this.options) {
                throw new Error("chart options not assigned")
            }
            if (apx.jcBase.isFunction(this.options.getOptions)) {
                return this.options.getOptions()
            }
            return this.options
        },

        /**
         * Установить chartInst в объекте options, если он это поддерживает
         */
        __setChartInst(chartInst) {
            if (apx.jcBase.isFunction(this.options.setChartInst)) {
                this.options.setChartInst(chartInst, this)
                this.$emit('set-chart-inst', chartInst, this)
            }
        },

        /**
         * Уведомить объект options, что экземпляр уничтожается, если он это поддерживает
         */
        __destroyChartInst(chartInst) {
            if (apx.jcBase.isFunction(this.options.destroyChartInst)) {
                this.options.destroyChartInst(chartInst, this)
                this.$emit('destroy-chart-inst', chartInst, this)
            }
        },

    },
}
