//
import {jcBase} from '../vendor'
import {VueService, createVueApp, initVueApp} from './app-service-vue'
import {registerVueComponents} from './utils'

// инициализируем приложение
jcBase.app.registerService(VueService)

// // функция взята из исходников vue
// function mergeAsArray(to, from) {
//     return to ? [...new Set([].concat(to, from))] : from;
// }
//
// initVueApp((vueApp) => {
// })

export {
    createVueApp,
    initVueApp,
    registerVueComponents,
}

