import {tst, apx} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    it("app1", function() {
        let Comp = {
            extends: apx.JcApp,
            template: `
                <App>
                app
                </App>`,
        }
        let comp = tst.vueMount(Comp)
    })

})

