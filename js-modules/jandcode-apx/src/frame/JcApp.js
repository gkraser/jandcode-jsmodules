import {showFrame} from './fm'
import {jcBase} from '../vendor'

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
            let ri = jcBase.app.frameRouter.resolve('')
            if (ri != null) {
                // есть home фрейм
                await this.showFrame({frame: ''})
            } else {
                // нет home фрейма, перезагагружаем страницу, без hash
                jcBase.app.frameManager.history.updateHash(null)
                window.location.reload()
            }
        }

    }

}
