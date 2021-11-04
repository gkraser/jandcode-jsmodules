//
import {apx, echarts} from './vendor'
import * as components from './components'
import langRU from 'echarts/lib/i18n/langRU'
import {hideAllTooltip} from './utils/chart-holder'
import {Chart} from './utils/chart'
import {ExportDataset} from './utils/export-dataset'

export * from './components'
//
apx.initVueApp((vueApp) => {
    apx.registerVueComponents(vueApp, components)
})

// настройки echarts по умолчанию
apx.jcBase.cfg.setDefault({
    echarts: {

        /**
         * Тема echarts по умолчанию
         */
        theme: 'default'

    }
})

// локаль
echarts.registerLocale('RU', langRU)

export {
    echarts,
    hideAllTooltip,
    Chart,
    ExportDataset,
}