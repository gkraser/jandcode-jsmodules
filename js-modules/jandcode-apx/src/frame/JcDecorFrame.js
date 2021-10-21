import JcDecor from './JcDecor'

/**
 * Базовый предок для декораторов фреймов.
 */
export default {

    extends: JcDecor,

    props: {

        /**
         * Классы для тела фрейма
         */
        bodyClass: {
            type: [Array, String, Object],
        },

        /**
         * Стили для тела фрейма
         */
        bodyStyle: {
            type: [Array, String, Object],
        },

        /**
         * Тело фрейма должно по возможности быть растянуто
         * на видимую часть экрана.
         */
        bodyFit: {
            type: Boolean
        }
    },

}
