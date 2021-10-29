//
import {jcBase} from '../vendor'
import {VueService, createVueApp, initVueApp} from './app-service-vue'
import * as vueUtils from './utils'
import {registerVueComponents, registerVueComponent} from './utils'

// инициализируем приложение
jcBase.app.registerService(VueService)

export {
    createVueApp,
    initVueApp,
    VueService,
    registerVueComponents,
    registerVueComponent,
    vueUtils,
}

