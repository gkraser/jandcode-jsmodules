/* Поддержка css

Код подразумевает, что компиляция сделана с использованием webpack

----------------------------------------------------------------------------- */

import * as cnv from './cnv'

let cssIdx = 0
let cssPlaces = {}

/**
 * Является ли объектом, который экспортирует css-loader
 */
export function isCssLoaderExport(data) {
    return cnv.isArray(data) && 'i' in data && cnv.isFunction(data['i'])
}

/**
 * Нормализация css.
 * Приводит data к виду {text:css}
 * @param data
 */
export function normCss(data) {
    if (!data) {
        return {text: ''}
    }
    if (cnv.isString(data)) {
        return {text: data}
    }
    if (isCssLoaderExport(data)) {
        if (!data._jcCss) {
            data._jcCss = {text: data.toString(), moduleId: data[0][0], _orig: data}
        }
        return data._jcCss
    }
    return data
}

/**
 * Преобразование объекта data в массив нормализованных css
 * @param data
 */
export function normCssArray(data) {
    if (!data) {
        return []
    }
    if (cnv.isArray(data)) {
        if (isCssLoaderExport(data)) {
            return [normCss(data)]
        } else {
            let res = []
            for (let a of data) {
                res.push(normCss(a))
            }
            return res
        }
    }
    return [normCss(data)]
}

export function appendCssTag(cssText, place, group, moduleId) {
    let styleTag = document.createElement("style");
    styleTag.rel = 'stylesheet'

    if (group) {
        styleTag.dataset.group = group
    }
    styleTag.innerHTML = cssText;

    let tagPlace = cssPlaces[place]
    if (tagPlace) {
        tagPlace.parentNode.insertBefore(styleTag, tagPlace);
    } else {
        document.head.appendChild(styleTag);
    }

    if (Jc.cfg.envDev) {
        cssIdx++;
        let cssIdxText = '' + cssIdx
        if (String.prototype.padStart) {
            cssIdxText = cssIdxText.padStart(3, '0')
        }
        styleTag.dataset.idx = cssIdxText
        if (moduleId) {
            styleTag.dataset.moduleId = moduleId
        }
    }

}

/**
 * Зарегистрировать место внедрения css-тегов
 * @param place имя
 */
export function defineCssPlace(place) {
    let tag = cssPlaces[place]
    if (tag) {
        return tag
    }
    tag = document.createElement("style");
    tag.rel = 'stylesheet'
    tag.dataset.place = place
    document.head.appendChild(tag);
    cssPlaces[place] = tag
    return tag
}

/**
 * Подключение css
 * @param css если строка - считается  текстом css. Если объект, то это css
 * в формате {text:cssText}
 * @param place место вставки
 */
export function applyCss(css, place) {
    if (place) {
        defineCssPlace(place)
    }
    let _css = normCss(css)

    if (!_css.text) {
        return // это не css
    }

    // уже было использовано
    if (_css._used) {
        return
    }

    _css._used = true

    let cssText = _css.text

    appendCssTag(cssText, place, _css.group, _css.moduleId)
}
