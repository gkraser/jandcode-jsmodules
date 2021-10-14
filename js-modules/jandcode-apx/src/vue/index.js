//
import {jcBase} from '../vendor'
import {VueService, createVueApp, initVueApp} from './app-service-vue'

// инициализируем приложение
jcBase.app.registerService(VueService)

export {
    createVueApp,
    initVueApp,
}

