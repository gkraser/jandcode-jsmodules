//
import {jcBase} from '../vendor'
import {VueService, createVueApp, initVueApp} from './app-service-vue'

// инициализируем приложение
jcBase.app.registerService(VueService)

initVueApp((vueApp) => {

})

export {
    createVueApp,
    initVueApp,
}

