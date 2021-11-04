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
import {FrameWrapper} from './wrapper'

export * from './fm'
export * from './shower'
export * from './dialog-buttons'

jcBase.app.registerService(FrameManagerService)

initVueApp((vueApp) => {
    registerVueComponent(vueApp, JcFrameShowerPage.name, JcFrameShowerPage)
    registerVueComponent(vueApp, 'DecorApp', dummyDecor.DummyDecorApp)
    registerVueComponent(vueApp, 'DecorPage', dummyDecor.DummyDecorPage)
    registerVueComponent(vueApp, 'DecorDialog', dummyDecor.DummyDecorDialog)
})

export {
    JcFrame,
    JcFrameShowerPage,
    JcDecor,
    JcDecorFrame,
    JcDecorApp,
    JcApp,
    FrameManagerService,
    FrameWrapper,
}