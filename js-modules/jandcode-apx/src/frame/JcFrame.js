import {showFrame} from './fm'

/**
 * Базовый предок для фреймов
 */
export default {

    props: {
        frameWrapper: {
            required: true
        }
    },

    data() {
        return {

            /**
             * Заголовок фрейма основной
             */
            title: null,

            /**
             * Второй заголовок фрейма. Он отображается под основным заголовков мелким
             * шрифтом.
             */
            title2: null,

            /**
             * Короткий заголовок фрейма. Отображается в bradcrumbs со списком фреймов.
             */
            titleShort: null,

            /**
             * Иконка для фрейма
             */
            icon: null,

            /**
             * Можно ли закрывать этот фрейм. Можно использовать для отслеживания
             * необходимости кнопки "Закрыть". Значение устанавливается автоматически.
             */
            closable: true,
        }
    },

    created() {
        this.frameWrapper.eventBus.on('show', () => {
            // получить closable можно только после того, как фрейм показан!
            this.closable = this.frameWrapper.isClosable()
        })
    },

    computed: {

        /**
         * Данные фрейма, которые заполняются в frameInit
         * @return {Object}
         */
        frameData: function() {
            return this.frameWrapper.frameData
        },

    },

    methods: {

        /**
         * showFrame из фрейма - автоматически помещается в стек
         */
        async showFrame(options) {
            if (!('stack' in options)) {
                options = Object.assign({}, options, {stack: true})
            }
            return await showFrame(options)
        },

        /**
         * Закрыть фрейм с указанной командой.
         * @param cmd команда
         */
        closeFrame(cmd) {
            this.frameWrapper.close(cmd)
        }

    }

}
