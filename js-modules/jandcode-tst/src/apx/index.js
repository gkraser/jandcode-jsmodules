/* Поддержка unit-тестирования для приложений apx
----------------------------------------------------------------------------- */

import {jcBase, apx} from '../vendor'
import * as mocha from '../mocha'
import styleCss from './style.css'

export * from './rnd-utils'

// css
jcBase.applyCss(styleCss)

/**
 * Пауза по умолчанию
 * @type {number}
 */
export let defaultPause = 250

//////

/**
 * Инициализация среды тестирования
 */
function init() {

    let vueWarnHolder = []

    before(function() {
        initEnv()
        //
        apx.initVueApp((vueApp) => {
            // все vue-warn регистрируем, потом будем их как ошибки показывать
            vueApp.config.warnHandler = (err, vm, info) => {
                console.warn(`[tst][Vue warn]:`, err, info, vm);
                vueWarnHolder.push({
                    err: err,
                    info: info,
                    vm: vm
                })
            }
        })
    })

    beforeEach(async function() {
        vueWarnHolder = []
        cleanBody()
        showBody()
        // пересоздание приложения
        jcBase.App.recreateApp()
        // и запуск его заново
        await jcBase.app.run(() => {
        })
    })

    afterEach(function() {
        if (vueWarnHolder.length > 0) {
            mocha.assert.fail(vueWarnHolder[0].err)
            vueWarnHolder = []
        }
    })
}

function initEnv() {
    let mochaEl = document.getElementById("mocha")
    if (!mochaEl) {
        mochaEl = document.createElement('div')
        mochaEl.id = 'mocha'
    }
    //
    let html = `<div id="tst-wrapper" class="tst-wrapper">
  <div id="tst-wrapper--mocha" class="tst-wrapper--mocha">
    <div id="tmp-place-mocha"></div>
  </div>

  <div id="tst-wrapper--jc-app" class="tst-wrapper--jc-app">
  </div>
</div>
`
    document.body.insertAdjacentHTML('afterbegin', html)
    //
    let tmp_mochaEl = document.getElementById("tmp-place-mocha")
    tmp_mochaEl.parentElement.replaceChild(mochaEl, tmp_mochaEl)
}

//////

/**
 * Возвращает элемент, куда можно выводить данные в тестах
 * @return {HTMLElement}
 */
export function getBody() {
    let id = "tst-wrapper--jc-app"
    let wrap = document.getElementById(id)
    if (!wrap) {
        wrap = document.createElement('div')
        wrap.id = id
        wrap.classList.add(id)
    }
    return wrap
}

export function cleanBody() {
    getBody().innerHTML = ''
}

export function hideBody() {
    getBody().classList.add('tst-hide')
}

export function showBody() {
    getBody().classList.remove('tst-hide')
}

export function pauseAfterEach(msec) {
    afterEach(function(cb) {
        setTimeout(function() {
            cb()
        }, msec || defaultPause)
    })
}

export function pause(msec) {
    msec = msec || defaultPause
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve()
        }, msec)
    })
}

/**
 * Создание и монтирование vue-компонента.
 * Возвращает экземпляр Vue
 * @param Comp компонент, может быть просто строкой-шаблоном
 * @param props значения свойств компонента
 * @return {Object} отрендеренный компонент
 */
export function vueMount(Comp, props) {
    if (jcBase.isString(Comp)) {
        Comp = {
            template: Comp
        }
    }

    // куда будем монтировать
    let body = getBody()

    if (body.childElementCount > 0) {
        let el = document.createElement('div')
        el.classList.add('tst-vuecomp-separator')
        body.appendChild(el)
    }

    let el = document.createElement('div')
    el.classList.add('tst-vuecomp')
    body.appendChild(el)

    // создаем и монтируем
    let vueApp = apx.createVueApp(Comp, props)
    let vueInst = vueApp.mount(el)

    //
    return vueInst
}

//////

init()
