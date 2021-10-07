/* Поддержка тем
----------------------------------------------------------------------------- */

import * as cnv from './cnv'
import * as base from './base'
import cfg from './cfg'
import * as cssUtils from './css'

cfg.set({
    theme: {}
})

let API_THEME = {
    css: Array | Object,
    config: Array | Object
}

let prevThemeId

/**
 * Применить тему
 * @param theme объект с конфигурацией темы
 */
export function applyTheme(theme) {
    cssUtils.defineCssPlace('before-theme')
    cssUtils.defineCssPlace('theme')

    let newThemeId = base.nextId('theme')

    if (theme.default) {
        theme = theme.default
    }
    //
    let css = cssUtils.normCssArray(theme.css)
    for (let it of css) {
        it.group = newThemeId
        it._used = false
        cssUtils.applyCss(it, 'theme')
    }

    //
    let config = {}
    if (cnv.isArray(theme.config)) {
        for (let it of theme.config) {
            if (it.default) {
                it = it.default
            }
            base.extend(true, config, it)
        }
    } else if (cnv.isObject(theme.config)) {
        let it = theme.config
        if (it.default) {
            it = it.default
        }
        base.extend(true, config, it)
    }

    // заменяем на новый config
    cfg.__values.theme = config
    // обновляем конфигурацию, что бы наложилсь default
    cfg.set({})

    // удаляем старую тему
    if (prevThemeId) {
        document.querySelectorAll("style[data-group=" + prevThemeId + "]").forEach(n => n.parentNode.removeChild(n))
    }
    prevThemeId = newThemeId
}