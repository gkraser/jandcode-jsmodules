//
import {apx} from './vendor'
import * as components from './components'

export * from './datagrid'
export * from './components'
export * from './utils'
//
apx.initVueApp((vueApp) => {
    apx.registerVueComponents(vueApp, components)
})
