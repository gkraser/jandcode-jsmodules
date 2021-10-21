import {showFrame} from './fm'
import JcDecorApp from './JcDecorApp'

let DummyApp = {
    extends: JcDecorApp,
    template: `<div><div>[dummy app decor: {{own.title}}]</div><slot/></div>`
}

/**
 * Базовый компонент-предок для приложения.
 */
export default {

    components: {
        App: DummyApp,
    },

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
