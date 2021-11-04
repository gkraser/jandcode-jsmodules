/* Декораторы-заглушки
----------------------------------------------------------------------------- */

import JcDecorApp from './JcDecorApp'
import JcDecorFrame from './JcDecorFrame'

export let DummyDecorApp = {
    extends: JcDecorApp,
    template: `<div><div>[dummy app decor: {{own.title}}]</div><slot/></div>`
}

export let DummyDecorPage = {
    extends: JcDecorFrame,
    template: `<div><div>[dummy page decor: {{own.title}}]</div><slot/></div>`
}

export let DummyDecorDialog = {
    extends: JcDecorFrame,
    template: `<div><div>[dummy dialog decor: {{own.title}}]</div><slot/></div>`
}
