import {apx, echarts} from '../vendor'
import * as chartHolder from '../utils/chart-holder'
import {Chart} from '../utils/chart'

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
    return jcChart.theme || jcChart.getChart().theme || apx.jcBase.cfg.echarts.theme || 'default'
}

/**
 * Обертка вокруг options, которая превращает их в Chart для унификации.
 */
class ChartOptionsWrapper extends Chart {

    /**
     * @param params.options опции, которые нужно заврапить
     */
    constructor(params) {
        super(params)
    }

    onBuild(options) {
        this.__options = this.params.options
        if (!this.__options) {
            this.__options = {}
        }
    }
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
        this.$nextTick(() => {
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
        if (this.__chart) {
            this.__chart = null
        }
    },

    render() {
        return h('div', {class: 'jc-chart'})
    },

    methods: {

        getChart() {
            if (this.options instanceof Chart) {
                return this.options
            }
            if (!this.__chart) {
                this.__chart = new ChartOptionsWrapper({options: this.options})
            }
            return this.__chart
        },

        syncSize() {
            let bcr = this.$el.getBoundingClientRect()
            if (bcr.height === 0 || bcr.width === 0) {
                // еще нет размеров
                return
            }

            if (this.chartInst == null) {
                let chartInst = this.__createChartInst()
                this.__setChartInst(chartInst)
                this.chartInst = chartInst
                this.rsw = apx.jcBase.dom.resizeWatch(this.$el, (ev) => {
                    this.syncSize()
                })
            }

            this.chartInst.resize({height: null, width: null})
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
            chartInst.setOption(this.getChart().getOptions())
            return chartInst
        },

        /**
         * Установить chartInst в объекте options, если он это поддерживает
         */
        __setChartInst(chartInst) {
            this.getChart().setChartInst(chartInst, this)
            this.$emit('set-chart-inst', chartInst, this)
        },

        /**
         * Уведомить объект options, что экземпляр уничтожается, если он это поддерживает
         */
        __destroyChartInst(chartInst) {
            this.getChart().destroyChartInst(chartInst, this)
            this.$emit('destroy-chart-inst', chartInst, this)
        },

    },
}
