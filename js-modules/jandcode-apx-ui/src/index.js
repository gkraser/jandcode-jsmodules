//
import {apx} from './vendor'
import * as components from './components'

import './msgbox'

export * from './components'
//
apx.initVueApp((vueApp) => {
    apx.registerVueComponents(vueApp, components)
    apx.registerVueComponents(vueApp, {
        'decor-app': components.JcDecorAppStd,
        'decor-page': components.JcDecorFramePage,
        'decor-dialog': components.JcDecorFrameDialog,
    })
})