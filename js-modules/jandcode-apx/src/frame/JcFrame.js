import {showFrame} from './fm'

/**
 * Базовый предок для фреймов
 */
export default {

    props: {
        frameWrapper: {}
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
         * Можно ли закрывать этот фрейм
         */
        isClosable() {
            return this.frameWrapper.shower.isFrameWrapperClosable(this.frameWrapper)
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
            this.frameWrapper.shower.closeFrameWrapper(this.frameWrapper, cmd)
        }

    }

}
