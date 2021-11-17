/*

Базовый функционал и утилиты
 
----------------------------------------------------------------------------- */

import Jc from './globalNs'
import * as base from './base'
import cfg from './cfg'
import * as dom from './dom'
import * as url from './url'
import * as popup from './popup'
import * as theme from './theme'
import * as ajax from './ajax'
import * as svgicons from './svgicons'
import * as jsonrpc from './jsonrpc'
import * as moduleRegistry from './module-registry'
import * as css from './css'
import {axios} from './vendor'
import * as path from './path'
import * as lang from './lang'
import * as csv from './csv'

export {
    Jc,
    dom,
    url,
    popup,
    theme,
    ajax,
    svgicons,
    jsonrpc,
    cfg,
    axios,
    moduleRegistry,
    css,
    path,
    lang,
    csv,
}

// модули на верхний уровень
export * from './base'
export * from './cnv'
export * from './module-registry'
export * from './error'
export * from './app'
export * from './wait'
export {
    applyCss,
    defineCssPlace,
} from './css'
export {
    applyTheme,
} from './theme'

// глобализация
// todo видимо не нужно более
Jc.ready = base.ready;
Jc.loadModule = moduleRegistry.loadModule
Jc.applyTheme = theme.applyTheme
Jc.applyCss = css.applyCss
Jc.defineCssPlace = css.defineCssPlace

