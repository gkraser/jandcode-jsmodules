/* Фреймы
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'

import JcFrame from './JcFrame'
import JcFrameShowerPage from './shower-page'

import JcDecor from './JcDecor'
import JcDecorFrame from './JcDecorFrame'
import JcDecorApp from './JcDecorApp'
import JcApp from './JcApp'

import {initVueApp} from '../vue'
import * as dummyDecor from './dummy-decor'

import {FrameManagerService} from './fm'

export * from './fm'
export * from './shower'

jcBase.app.registerService(FrameManagerService)

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
    FrameManagerService,
}