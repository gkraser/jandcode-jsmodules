import * as stdColumnTypes from './std-column-types'
import {registerColumnType} from './column'

export * from './grid'
export * from './column'
export * from './data'

//
for (let colTypeName in stdColumnTypes) {
    registerColumnType(colTypeName, stdColumnTypes[colTypeName])
}
