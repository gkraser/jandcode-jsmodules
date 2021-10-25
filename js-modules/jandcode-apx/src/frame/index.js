/* Фреймы
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'

import JcFrame from './JcFrame'
import JcFrameShowerPage from './shower-page'

import JcDecor from './JcDecor'
import JcDecorFrame from './JcDecorFrame'
import JcDecorApp from './JcDecorApp'
import JcApp from './JcApp'

import {initVueApp, registerVueComponent} from '../vue'
import * as dummyDecor from './dummy-decor'

import {FrameManagerService} from './fm'

export * from './fm'
export * from './shower'

jcBase.app.registerService(FrameManagerService)

initVueApp((vueApp) => {
    registerVueComponent(vueApp, JcFrameShowerPage.name, JcFrameShowerPage)
    registerVueComponent(vueApp, 'jc-decor-app', dummyDecor.DummyDecorApp)
    registerVueComponent(vueApp, 'jc-decor-page', dummyDecor.DummyDecorPage)
    registerVueComponent(vueApp, 'jc-decor-dialog', dummyDecor.DummyDecorDialog)
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