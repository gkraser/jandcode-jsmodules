//
import {apx} from './vendor'
import * as components from './components'
import * as stdColumnTypes from './std-column-types'
import {registerColumnType} from './dg'

export * from './dg'
export * from './components'
//
apx.initVueApp((vueApp) => {
    apx.registerVueComponents(vueApp, components)
})

//
for (let colTypeName in stdColumnTypes) {
    registerColumnType(colTypeName, stdColumnTypes[colTypeName])
}

export {}