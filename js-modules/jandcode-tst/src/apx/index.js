/* Поддержка unit-тестирования для приложений apx
----------------------------------------------------------------------------- */

import {jcBase, apx} from '../vendor'

export * from './rnd-utils'

import styleCss from './style.css'

// css
jcBase.applyCss(styleCss)

/**
 * Пауза по умолчанию
 * @type {number}
 */
export let defaultPause = 250

//////

class TestAppService extends jcBase.AppService {

    onCreate() {
        // удаляем обработчик ошибок
        this.app.__services = this.app.__services.filter((it) => {
            return "errorHandlersService" != it.getName()
        })

        // todo настройка обработчиков ошибки для vue
        // Vue.config.errorHandler = function(err, vm, info) {
        //     console.error(`[Vue error]: ${err}${info}`)
        //     throw new Error(err)
        // }
        //
        // Vue.config.warnHandler = function(err, vm, info) {
        //     console.error(`[Vue warn]: ${err}${info}`)
        //     throw new Error(err)
        // }
    }

}

/**
 * Инициализация среды тестирования
 */
function init() {
    before(function() {
        initEnv()
        //
        jcBase.app.registerService(TestAppService)
    })

    beforeEach(function() {
        cleanBody()
        showBody()
        // пересоздание приложения
        jcBase.App.recreateApp()
        // и запуск его заново
        jcBase.app.run(() => {
        })
    });
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
