/*

Утилиты для dom/html

----------------------------------------------------------------------------- */

import * as base from './base'
import * as cnv from './cnv'
import lodashDebounce from 'lodash/debounce'

/**
 * @typedef {Object} DomPoint
 * @property {number} x x
 * @property {number} y y
 */

/**
 * @typedef {Object} DomRect
 * @property {number} x x
 * @property {number} y y
 * @property {number} w width
 * @property {number} h height
 */

// текущая позиция мыши
let _currentMousePos = {
    x: 0,
    y: 0
}

/**
 * Текущая позиция мыши {x,y} относительно окна.
 * @return {DomPoint}
 */
export function getCurrentMousePos() {
    return Object.assign({}, _currentMousePos)
}


/**
 * Конвертация значения a в размер для стиля:
 * 12 -> '12px'
 * '12' -> '12px'
 * 'any' -> 'any'
 * @param a
 * @return {String}
 */
export function toStyleSize(a) {
    if (a == null || a === '') return '';
    if (cnv.isNumber(a)) {
        return '' + a + 'px';
    }
    if (cnv.isNumChar(a.charAt(a.length - 1))) {
        return a + 'px';
    }
    return '' + a;
}

/**
 * Возвращает прямоугольник для элемента (x,y,w,h)
 * относительно экрана
 * @param node {Element}
 * @return {DomRect}
 */
export function getNodeBound(node) {
    let a = node.getBoundingClientRect();
    return {
        x: a.left,
        y: a.top,
        w: a.width,
        h: a.height
    }
}

/**
 * Устанавливает позицию и размер элемента (x,y,w,h)
 * относительно экрана.
 *
 * @param node {Element}
 * @param b {DomRect}
 */
export function setNodeBound(node, b) {
    if (!b) {
        return;
    }
    if ('x' in b) {
        node.style.left = toStyleSize(b.x + window.pageXOffset);
    }
    if ('y' in b) {
        node.style.top = toStyleSize(b.y + window.pageYOffset);
    }
    if ('w' in b) {
        node.style.width = toStyleSize(b.w);
    }
    if ('h' in b) {
        node.style.height = toStyleSize(b.h);
    }
}

/**
 * Размер экрана
 * @return {DomRect}
 */
export function getViewportBound() {
    return {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight
    }
}

let __createTmpElement_place = null

/**
 * Создает элемент, который лежит в dom, видим, но за пределами экрана.
 * После использования его нужно удалять, что бы не замусоривать dom.
 * Используется для отложенного рендеринга вещей, которые правильно рендярятся
 * только в реальные видимые элементы.
 *
 * @param tagName имя тега (по умолчанию 'div')
 * @param id id тега, если установлен
 */
export function createTmpElement(tagName, id) {
    if (__createTmpElement_place == null) {
        __createTmpElement_place = document.createElement('div')
        __createTmpElement_place.id = base.nextId('tmp-place-')
        __createTmpElement_place.style.position = 'fixed'
        __createTmpElement_place.style.zIndex = '100500'
        __createTmpElement_place.style.maxWidth = '100vw'
        __createTmpElement_place.style.left = '500vw'
        __createTmpElement_place.style.top = '0'
        document.body.appendChild(__createTmpElement_place)
    }
    let el = document.createElement(tagName || 'div')
    el.id = id || base.nextId('tmp-node-')
    __createTmpElement_place.appendChild(el)
    return el
}

/**
 * Возвращает элемент уровня приложения.
 * Если его нет - создается.
 * @param id id элемента, по умолчанию jc-app
 */
export function getAppElement(id = 'jc-app') {
    let el = document.getElementById(id)
    if (!el) {
        el = document.createElement('div')
        el.id = id
        document.body.insertAdjacentElement('afterbegin', el)
    }
    return el
}

//////

class ResizeWatcher {

    constructor(el, trigger, debonceTimeout) {
        if (!el) {
            throw new Error("el not defined")
        }
        if (!trigger) {
            throw new Error("trigger not defined")
        }
        if (debonceTimeout == null) {
            debonceTimeout = 100
        }
        this.el = el
        this.listener = (ev) => {
            trigger(ev)
        }
        this.listener_dobonced = lodashDebounce(this.listener, debonceTimeout)
        this.rso = new ResizeObserver(this.listener_dobonced)
        this.rso.observe(this.el)
    }

    destroy() {
        this.rso.disconnect()
        this.listener_dobonced.cancel()
        this.listener_dobonced = null
        this.el = null
        this.rso = null
        this.listener = null
    }

}

/**
 * Установить наблюдение за измененем размеров dom-элемента
 * @param el за каким элементом наюлюдаем
 * @param trigger функция будет вызвана, когда размер изменится
 * @param debonceTimeout пауза между многократными вызовами, что бы уменьшить число
 * вызовов trigger. По умолчанию - 100
 * @return {ResizeWatcher} возвращает объект с методом destroy(), который нужно вызвать
 * что бы отменить наблюдение
 */
export function resizeWatch(el, trigger, debonceTimeout) {
    return new ResizeWatcher(el, trigger, debonceTimeout)
}

//////

/**
 * Калькулятор размеров px.
 * Позволяет переводить размеры css в px.
 *
 * Принцип работы.
 *
 * Формируется иерархия элементов из options.parentElements. К ним добавляется еще
 * один, самого нижнего уровня. При расчете размера самому нижнему элементу ставятся
 * соотвествующие стили. Фактически размер возвращается из элемента, на который
 * указывает options.targetElement.
 *
 * Особые искуственные еденицы измерения:
 * * 'NNchar' - для getWidth, ширина, если содержимое NN-нулей, например '20char'
 * * 'NNline' - для getHeight, высота, если содержимое NN-строк, например '2line'
 */
export class PixelCalc {

    /**
     * @param {Object} options опции
     * @param {Array} options.classList список классов элемента, для которого расчитывается
     * размер
     * @param {Array} options.parentElements списко элементов, которые станут родителями
     * ноды, в которой будут расчитываться размеры. Может быть Element (если он первый -
     * воссоздается его иерархия до body), строка (класс), массив строк (массив классов)
     * @param {String} options.targetElement селектор для элемента, чьи размеры будут
     * возвращатся. Если не указано, то принимается по умолчанию
     * @param {Boolean} options.round округлять ли до int, по умолчанию - да
     */
    constructor(options) {
        this.options = Object.assign({}, options)
        this.tmpEl = createTmpElement()

        let elements = this.__makeEl(this.options.parentElements)
        this.el = elements.el
        this.tmpEl.appendChild(elements.top)

        this.targetEl = this.el
        if (this.options.targetElement) {
            let targetEl = this.tmpEl.querySelector(this.options.targetElement)
            if (targetEl) {
                this.targetEl = targetEl
            }
        }

        if (cnv.isArray(this.options.classList)) {
            this.el.classList.add(...this.options.classList)
        }
        this.round = true
        if ('round' in this.options) {
            this.round = !!this.options.round
        }
        this.cacheWidth = {}
        this.cacheHeight = {}

    }

    destroy() {
        if (this.tmpEl) {
            this.tmpEl.remove()
            this.tmpEl = null
        }
    }

    /**
     * Для ширины в css возвращает ширину в px
     * @param size ширина в css (em, rem...)
     * @return {number}
     */
    getWidth(size) {
        if (cnv.isNumber(size)) {
            if (this.round) {
                return Math.trunc(size)
            }
            return size
        }
        let z = this.cacheWidth[size]
        if (z != null) {
            return z
        }
        this.el.innerHTML = ''
        if (size.endsWith('char')) {
            this.el.style.width = 'auto'
            let cnt = cnv.toInt(size.substring(0, size.length - 4))
            this.el.innerHTML = "0".repeat(cnt)
        } else {
            this.el.style.width = size
        }
        this.el.style.height = '1em'
        let cst = window.getComputedStyle(this.el)

        let bcr = this.targetEl.getBoundingClientRect()
        z = bcr.width
        if (this.round) {
            z = Math.trunc(z)
            if (z === 0) {
                z = 1
            }
        }
        this.cacheWidth[size] = z

        return z
    }

    /**
     * Для ширины в css возвращает ширину в px
     * @param size ширина в css (em, rem...)
     * @return {number}
     */
    getHeight(size) {
        if (cnv.isNumber(size)) {
            if (this.round) {
                return Math.trunc(size)
            }
            return size
        }
        let z = this.cacheHeight[size]
        if (z != null) {
            return z
        }
        this.el.innerHTML = ''
        if (size.endsWith('line')) {
            this.el.style.height = 'auto'
            let cnt = cnv.toInt(size.substring(0, size.length - 4))
            this.el.innerHTML = "0<br>".repeat(cnt)
        } else {
            this.el.style.height = size
        }
        this.el.style.width = '1em'

        let bcr = this.targetEl.getBoundingClientRect()
        z = bcr.height
        if (this.round) {
            z = Math.trunc(z)
            if (z === 0) {
                z = 1
            }
        }
        this.cacheHeight[size] = z
        return z
    }

    //////

    __makeEl(parentElelemns) {
        let nodes = []

        let cloneNode = (node) => {
            let n = node.cloneNode(false)

            n.style.width = 'auto'
            n.style.minWidth = 'auto'
            n.style.maxWidth = 'auto'
            n.style.height = 'auto'
            n.style.minHeight = 'auto'
            n.style.maxHeight = 'auto'
            n.style.position = 'static'

            return n
        }

        let cloneNodeUp = (node) => {
            let res = []
            let cur = node
            while (cur) {
                if (cur.tagName === 'BODY') {
                    break
                }
                res.unshift(cloneNode(cur))
                cur = cur.parentNode
            }
            return res
        }

        if (cnv.isArray(parentElelemns)) {
            for (let i = 0; i < parentElelemns.length; i++) {
                let parent = parentElelemns[i]
                if (parent instanceof Element) {
                    if (i === 0) {
                        let n = cloneNodeUp(parent)
                        nodes.push(...n)
                    } else {
                        nodes.push(cloneNode(parent))
                    }
                } else {
                    let n = document.createElement('div')

                    let classList = []
                    if (cnv.isString(parent)) {
                        classList.push(parent)
                    } else if (cnv.isArray(parent)) {
                        classList.push(...parent)
                    }
                    n.classList.add(...classList)
                    nodes.push(cloneNode(n))
                }
            }
        }


        if (nodes.length === 0) {
            // не было получено иерархии, делаем фиктивный корневой
            nodes.push(document.createElement('div'))
        }

        // это последняя нода, источник размеров
        nodes.push(document.createElement('div'))

        let cur = nodes[0]
        for (let i = 1; i < nodes.length; i++) {
            let n = nodes[i]
            cur.appendChild(n)
            cur = n
        }

        return {
            top: nodes[0],
            el: nodes[nodes.length - 1],
        }

    }

}

//////

/**
 * Инициализация модуля
 * @private
 */
function _init() {

    // отслеживание текущей позиции мыши
    window.addEventListener("mousemove", function(ev) {
        _currentMousePos.x = ev.clientX;
        _currentMousePos.y = ev.clientY;
    });

}

//////
base.ready(function() {
    _init()
})

