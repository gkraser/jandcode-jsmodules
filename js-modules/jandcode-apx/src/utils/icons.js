/*

Иконки

----------------------------------------------------------------------------- */

import {jcBase, Vue} from '../vendor'

const ICON_EMPTY = 'empty'
const ICON_UNKNOWN = 'unknown'

// зарегистрированные иконки
let _icons = {}

let svgEmpty = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>`

let svgUnknown = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <circle cx="15.5" cy="9.5" r="1.5"/>
    <circle cx="8.5" cy="9.5" r="1.5"/>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"/>
</svg>`

let _holderUnregistredIcons = {}

// для svg иконок
let {h} = Vue

/**
 * Для иконки вида 'img:URL' превращает url в абсолютный
 * и возвращает полученную иконку 'img:NEWURL'.
 * Для остальных - возвращает undefined
 */
export function fixIconUrl(name) {
    if (name.startsWith('img:')) {
        return 'img:' + jcBase.url.ref(name.substring(4))
    }
    if (jcBase.url.isAbs(name)) {
        return 'img:' + name
    }
}

/**
 * По имени зарегистрированной иконки возвращает то, зарегистрированно.
 * Если не найдено - возвращает undefined
 */
export function getIcon(name) {
    let ic = _icons[name]
    if (ic) {
        return ic
    }
}

/**
 * Регистрация иконок
 * @param icons Объект, в котором ключ - имя иконки, значение - иконка.
 * Если иконка - текст svg, то дополнительно регистрируется svg-иконка.
 */
export function registerIcons(icons) {
    if (!icons) {
        return
    }
    for (let nm in icons) {
        let v = icons[nm]
        if (v.startsWith('<svg')) {
            // svg иконка
            jcBase.svgicons.registerSvgIcon(nm, v)
            v = 'svg:' + nm
        }
        let a = fixIconUrl(v)
        if (a) {
            _icons[nm] = a
        } else {
            _icons[nm] = v
        }
    }
}

/**
 * Все зарегистрированные иконки
 */
export function getIcons() {
    return _icons
}

/**
 * Реализация quasar.iconMapFn по умолчанию
 */
export function quasar_iconMapFn(iconName) {
    let a = fixIconUrl(iconName)
    if (a) {
        return {
            icon: a
        }
    }

    if (iconName.startsWith(' ')) {
        if (iconName.trim() === '') {
            iconName = ICON_EMPTY
        }
    }

    a = getIcon(iconName)
    if (a) {
        if (a.startsWith('svg:')) {
            // svg иконка
            let b = a.substring(4)
            b = jcBase.svgicons.getSvgIconId(b)
            if (b) {
                return {
                    cls: 'jc-svgicon',
                    content: h('svg', [h('use', {"href": '#' + b})])
                }
            } else {
                // не зарегистрирована svg
                if (!_holderUnregistredIcons[a]) {
                    console.warn('Unregistred svg icon:', a, 'for', iconName)
                    _holderUnregistredIcons[a] = 1
                }
                // возвращаем как неизвестную
                return quasar_iconMapFn(ICON_UNKNOWN)
            }
        } else {
            return {
                icon: a
            }
        }
    }

    if (jcBase.cfg.envDev) {
        // уведомление в отладочном режиме и только раз
        if (!_holderUnregistredIcons[iconName]) {
            console.warn('Unregistred icon:', iconName)
            _holderUnregistredIcons[iconName] = 1
        }
    }

    // возвращаем как неизвестную
    return quasar_iconMapFn(ICON_UNKNOWN)
}

function init() {
    registerIcons({
        [ICON_EMPTY]: svgEmpty,
        [ICON_UNKNOWN]: svgUnknown,
    })
}

init()

