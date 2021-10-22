/* Фреймы
----------------------------------------------------------------------------- */

import JcFrame from './JcFrame'
import JcFrameShowerPage from './shower-page'
import {FrameShower_dialog} from './shower-dialog'

import JcDecor from './JcDecor'
import JcDecorFrame from './JcDecorFrame'
import JcDecorApp from './JcDecorApp'
import JcApp from './JcApp'

import {registerShower} from './shower'
import {initVueApp, registerVueComponents} from '../vue'
import * as dummyDecor from './dummy-decor'

export * from './fm'
export * from './shower'

registerShower('dialog', new FrameShower_dialog())

initVueApp((vueApp) => {
    vueApp.component(JcFrameShowerPage.name, JcFrameShowerPage)
    vueApp.component('jc-decor-app', dummyDecor.DummyDecorApp)
    vueApp.component('jc-decor-page', dummyDecor.DummyDecorPage)
    vueApp.component('jc-decor-dialog', dummyDecor.DummyDecorDialog)
})

export {
    JcFrame,
    JcFrameShowerPage,
    JcDecor,
    JcDecorFrame,
    JcDecorApp,
    JcApp,
}