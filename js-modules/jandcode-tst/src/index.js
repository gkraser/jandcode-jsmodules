/* tst - среда тестирования и экспериментирования
----------------------------------------------------------------------------- */

import * as vue from 'vue'
import {jcBase} from './vendor'
import TstApp from './components/TstApp'
import {runModule} from './run-module'

//
jcBase.cfg.setDefault({
    tst: {}
})

export * from './mocha'

//////

/**
 * Запуск среды тестирования или конкретного модуля в контексте среды тестирования
 */
export async function run() {

    // параметры страницы
    let pageParams = jcBase.url.getPageParams()

    if (pageParams.module) {
        // указан модуль - запускаем его
        console.info("tst module param", pageParams.module);
        await runModule(pageParams.module)
    } else {
        // модуль не указан - показываем стартовую запускалку
        console.info("tst NO module param");

        let vm = vue.createApp(TstApp)
        vm.mount(jcBase.dom.getAppElement())
    }

}
