/* tst - среда тестирования и экспериментирования
----------------------------------------------------------------------------- */

import * as vue from 'vue'
import {apx, jcBase} from './vendor'
import TstApp from './components/TstApp'
import {runModule} from './run-module'
import * as mixins from './mixins'

//
jcBase.cfg.setDefault({
    tst: {}
})

export * from './mocha'
export * from './apx'

import * as components from './components'

apx.initVueApp((vueApp) => {
    apx.registerVueComponents(vueApp, components)
})

export {
    mixins,
}

//////

/**
 * Запуск среды тестирования или конкретного модуля в контексте среды тестирования
 */
export async function run() {
    // параметры страницы
    let pageParams = jcBase.url.getPageParams()

    if (pageParams.module) {
        // указан модуль - запускаем его
        await runModule(pageParams.module)
    } else {
        // модуль не указан - показываем стартовую запускалку
        let vm = vue.createApp(TstApp)
        vm.mount(jcBase.dom.getAppElement())
    }

}

