/* tst - среда тестирования и экспериментирования
----------------------------------------------------------------------------- */

import * as vue from 'vue'
import {jcBase} from './vendor'
import TstApp from './components/TstApp'
import {runModule} from './run-module'
import './mocha-support'

//

jcBase.cfg.setDefault({
    tst: {}
})

export async function run() {

    // параметры страницы
    let pageParams = jcBase.url.getPageParams()

    if (pageParams.module) {
        // указан модуль - запускаем его
        console.info("tst module param", pageParams.module);
        runModule(pageParams.module)
    } else {
        // модуль не указан - показываем стартовую запускалку
        console.info("tst NO module param");

        let vm = vue.createApp(TstApp)
        vm.mount(jcBase.dom.getAppElement())
    }

}
