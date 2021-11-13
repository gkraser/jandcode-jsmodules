//
import {apx} from './vendor'
import * as components from './components'

export * from './dg'
export * from './components'
//
apx.initVueApp((vueApp) => {
    apx.registerVueComponents(vueApp, components)
})

export {
}