<template>
    <tst-panel>
        Посмотрите api в консоле...
    </tst-panel>
</template>

<script>
import {apx} from '../vendor'
import * as tst from '@jandcode/tst'
import * as apxUi from '@jandcode/apx-ui'

export default {
    created() {
        this.printApi()
    },
    methods: {
        printApi() {
            console.info("API модулей");
            console.info("@jandcode/apx", apx);
            console.info("@jandcode/apx-ui", apxUi);
            console.info("@jandcode/base", apx.jcBase);
            console.info("@jandcode/tst", tst);

            let vueApp = apx.createVueApp({template: '<div>dummy app</div>'})
            console.info("components", vueApp._context.components);
            console.info("vueApp", vueApp);

            let vueInst = vueApp.mount(tst.getBody())
            console.info("vueInst", vueInst);
        }
    }
}
</script>

