/**
 * Диаграмма.
 *
 * Экземпляры таких классов можно передавать в параметр options
 * компонента jc-chart.
 *
 * Необходимо унаследоватся от этого класса и перекрыть метод onBuild(options), в котором
 * заполнить options для диаграммы echarts.
 *
 * @example
 *
 * class MyChart extends Chart {
 *     onBuild(options) {
 *         Object.assign(options, {
 *              xAxis: {
 *                type: 'category',
 *                 ...
 *              },
 *              ...
 *        })
 *     }
 * }
 */

import {ExportDataset} from './export-dataset'

export class Chart {

    constructor(params) {
        /**
         * Параметры диаграммы
         * @type {Object}
         */
        this.params = Object.assign({}, params)

        /**
         * Имя темы echarts для этой диаграммы. Если не указано, то будет браться
         * из настроек по умолчанию.
         * @type {string}
         */
        this.theme = ''

        // конфигурация для echarts, доступна через getOptions()
        this.__options = null
        // экспортируемые данные диаграммы
        this.__exportData = null
    }

    /**
     * Построение конфигурации echarts.
     * Метод необходимо перекрыть.
     * @param {Object} options конфигурация echarts, которую нужно заполнить
     */
    onBuild(options) {
    }

    /**
     * Конфигурация для echarts.
     * Строится в момент первого вызова в методе onBuild и кешируется.
     * @return {Object}
     */
    getOptions() {
        if (this.__options == null) {
            this.__options = {}
            this.onBuild(this.__options)
        }
        return this.__options
    }

    /**
     * Метод будет вызван в jc-chart после создания экземпляра echarts.
     * Тут можно настроить обработчики событий.
     * Следует иметь ввиду, что метод может быть вызван несколько раз для
     * разных экземпляров echarts и vue, т.к. vue может рендерить компоненты по своему
     * усмотрению. Так что сохранять chartInst и compInst в свойствах для дальнейшего
     * использования бессмысленно.
     *
     * @param chartInst Экземпляр echarts
     * @param compInst Vue-экземпляр jc-chart
     */
    setChartInst(chartInst, compInst) {
    }

    /**
     * Метод будет вызван в jc-chart перед уничтожением экземпляра echarts.
     * Тут можно почистить за собой, если намусорили.
     * Следует иметь ввиду, что метод может быть вызван несколько раз для
     * разных экземпляров echarts и vue, т.к. vue может рендерить компоненты по своему
     * усмотрению.
     *
     * @param chartInst Экземпляр echarts
     * @param compInst Vue-экземпляр jc-chart
     */
    destroyChartInst(chartInst, compInst) {
    }

    /**
     * Обновить все или несколько параметров.
     * После вызова этого метода, getOptions() будет пересчитано заново.
     * Используется для имитации реактивности, например в тестах.
     *
     * @param params {Object} новые значения параметров
     */
    updateParams(params) {
        Object.assign(this.params, params)
        this.__options = null
        this.__exportData = null
    }

    /**
     * Сформировать экспортируемые данные
     * .
     * @param {ExportDataset} dataset экземпляр ExportDataset, который нужно заполнить данными
     */
    onExportData(dataset) {
    }

    /**
     * Экспортируемые данные диаграммы.
     * Данные строятся в момент первого вызова в методе onExportData и кешируются.
     * @return {ExportDataset} данные, возможно пустые, если экспорт не поддерживается
     */
    getExportData() {
        if (this.__exportData == null) {
            // берем опции, возможно dataset будут строится там
            this.getOptions()
            //
            this.__exportData = new ExportDataset()
            this.onExportData(this.__exportData)
        }
        return this.__exportData
    }

    /**
     * Поддерживается ли экспорт данных. По умолчанию - если переопределен onExportData,
     * то поддерживается.
     */
    hasExportData() {
        return this.onExportData !== Chart.prototype.onExportData
    }

}
