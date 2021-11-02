/**
 * Обертка вокруг ChartBuilder.
 * Используется как базовый класс для helper-классов построения
 * диаграмм. Такие классы содержат различные утилиты.
 */
export class ChartBuilderHelper {

    /**
     * Конструктор
     * @param builder {ChartBuilder} ссылка на builder
     * @param params {Object} параметры. Все ключи становятся свойствами экземпляра.
     */
    constructor(builder, params) {
        /**
         * Ссылка на ChartBuilder
         * @type ChartBuilder
         */
        this.builder = builder

        /**
         * Параметры, переданные в конструкторе
         */
        this.params = apx.jcBase.extend({}, params)

    }

}