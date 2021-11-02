//
import {apx, echarts} from './vendor'
import * as components from './components'
import langRU from 'echarts/lib/i18n/langRU'

export * from './components'
//
apx.initVueApp((vueApp) => {
    apx.registerVueComponents(vueApp, components)
})

// настройки echarts по умолчанию
apx.jcBase.cfg.setDefault({
    echarts: {
        // тема echarts по умолчанию
        theme: 'default'
    }
})

// локаль
echarts.registerLocale('RU', langRU)

export {
    echarts
}