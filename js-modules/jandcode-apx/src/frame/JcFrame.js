import JcDecorFrame from './JcDecorFrame'

let DummPage = {
    extends: JcDecorFrame,
    template: `<div><div>[dummy page decor: {{own.title}}]</div><slot/></div>`
}

let DummyDialog = {
    extends: JcDecorFrame,
    template: `<div><div>[dummy dialog decor: {{own.title}}]</div><slot/></div>`
}

/**
 * Базовый предок для фреймов
 */
export default {

    components: {
        Page: DummPage,
        Dialog: DummyDialog,
    },

    props: {
        frameWrapper: {}
    }

}
