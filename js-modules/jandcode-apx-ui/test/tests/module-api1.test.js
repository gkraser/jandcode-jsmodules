import {apx, tst, apxUi} from './vendor'

describe(module.id, function() {

    it("module-api", function() {
        console.info("API модулей");
        console.info("@jandcode/apx", apx);
        console.info("@jandcode/apx-ui", apxUi);
        console.info("@jandcode/base", apx.jcBase);
        console.info("@jandcode/tst", tst);

        let vueApp = apx.createVueApp({template:'<div>dummy app</div>'})
        console.info("components", vueApp._context.components);
        console.info("vueApp", vueApp);

        let vueInst = vueApp.mount(tst.getBody())
        console.info("vueInst", vueInst);
    })

})

