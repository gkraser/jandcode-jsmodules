/* clipboard
----------------------------------------------------------------------------- */
import * as cnv from './cnv'
import * as dom from './dom'

/**
 * Копирует html-элемент в буфер обмена
 * @param el html-элемент
 */
export function copyElement(el) {
    let range = document.createRange()
    let sel = window.getSelection()
    sel.removeAllRanges()
    range.selectNodeContents(el)
    sel.addRange(range)
    document.execCommand("copy")
}

/**
 * Копирует html-текст в буфер обмена
 * @param html html-текст
 */
export function copyHtml(html) {
    let el = document.createElement('div')
    el.innerHTML = html
    if (el.childElementCount === 1) {
        el = el.firstElementChild
    }
    let tmpEl = dom.createTmpElement()
    tmpEl.appendChild(el)
    try {
        copyElement(el)
    } finally {
        tmpEl.remove()
    }
}
