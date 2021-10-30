/* tst - среда тестирования и экспериментирования
----------------------------------------------------------------------------- */

import * as vue from 'vue'
import {apx, jcBase} from './vendor'
import TstApp from './app/TstApp'
import TstErrorApp from './app/TstErrorApp'
import {runModule} from './run-module'
import * as mixins from './mixins'
import * as components from './components'

//
jcBase.cfg.setDefault({
    tst: {}
})

export * from './mocha'
export * from './apx'
export * from './cfg-store'

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
        try {
            await runModule(pageParams.module)
        } catch(e) {
            console.error("error", e);
            let vm = vue.createApp(TstErrorApp, {
                error: e
            })
            vm.mount(jcBase.dom.getAppElement())
        }
    } else {
        // модуль не указан - показываем стартовую запускалку
        let vm = vue.createApp(TstApp, {
            filter: pageParams.filter
        })
        vm.mount(jcBase.dom.getAppElement())
    }

}

