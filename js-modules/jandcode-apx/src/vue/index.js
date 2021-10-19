//
import {jcBase} from '../vendor'
import {VueService, createVueApp, initVueApp} from './app-service-vue'

// инициализируем приложение
jcBase.app.registerService(VueService)

// функция взята из исходников vue
function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
}

initVueApp((vueApp) => {
    // работает аналогично другим life-cycle hookd
    vueApp.config.optionMergeStrategies.frameInit = mergeAsArray
})

export {
    createVueApp,
    initVueApp,
}

