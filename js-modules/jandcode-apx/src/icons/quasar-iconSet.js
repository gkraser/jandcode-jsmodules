/*
Quasar iconSet

Адаптация к иконкам jandcode

----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'
import svgQuasarIconSet from 'quasar/icon-set/svg-material-icons'

/**
 * quasar iconSet с иконками jandcode
 */
export let quasarIconSet = {}

/**
 * Иконки из quasar iconSet
 */
export let quasarIcons = {}

/**
 * Из иконки в формате quasar-svg-icon делает обычный svg.
 * Формат описан тут: https://quasar.dev/vue-components/icon#svg-icon-format
 * @param icon текст svg иконки quasar
 * @return {string}
 */
function quasarSvgToNormalSvg(icon) {
    let [def, viewBox] = icon.split('|')
    viewBox = viewBox !== void 0 ? viewBox : '0 0 24 24'

    let res = '<svg viewBox="' + viewBox + '">'

    def.split('&&').map(path => {
        let [d, style, transform] = path.split('@@')
        res += '<path d="' + d + '"'
        if (style) {
            res += ' style="' + style.replace(/"/g, "'") + '"'
        }
        if (transform) {
            res += ' transform="' + style.replace(/"/g, "'") + '"'
        }
        res += '/>'
    })

    res += '</svg>'

    return res
}

/**
 * Конвертация quasar iconSet в формат для jandcode.
 * @param toJc куда помещать иконки jandcode
 * @param toQuasar куда помещать новый quasar iconSet
 * @param from оригинальный quasar iconSet
 * @param prefix префикс для имен иконок
 */
function cnv(toJc, toQuasar, from, prefix) {
    for (let key in from) {
        let value = from[key]
        let newKey = prefix + '.' + key
        if (jcBase.isObject(value)) {
            toQuasar[key] = {}
            cnv(toJc, toQuasar[key], value, newKey)
        } else {
            if (value.startsWith('M')) {
                value = quasarSvgToNormalSvg(value)
            }
            toJc[newKey] = value
            toQuasar[key] = newKey
        }
    }
}

function init() {
    let miq = JSON.parse(JSON.stringify(svgQuasarIconSet))
    let name = 'converted-' + miq['name']
    delete miq['name']
    cnv(quasarIcons, quasarIconSet, miq, 'quasar')
    quasarIconSet.name = name
}

init()
