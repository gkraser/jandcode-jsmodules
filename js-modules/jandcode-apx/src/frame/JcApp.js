import {showFrame} from './fm'

/**
 * Базовый компонент-предок для приложения.
 */
export default {

    data() {
        return {
            title: 'Без заголовка',
            title2: null,
            icon: 'app-logo',

            left: true,
            leftWidth: 280,

            right: false,
            rightWidth: 280,
        }
    },

    methods: {

        async showFrame(options) {
            await showFrame(options)
        },

        async home() {
            await this.showFrame({frame: ''})
        }

    }

}
