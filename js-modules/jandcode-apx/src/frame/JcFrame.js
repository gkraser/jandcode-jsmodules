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
            title: null,
            title2: null,
            icon: null,
        }
    },

    computed: {

        /**
         * Можно ли закрывать этот фрейм. Можно использовать для отслеживания
         * необходимости кнопки "Закрыть".
         */
        isClosable() {
            return this.frameWrapper.isClosable()
        }

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
