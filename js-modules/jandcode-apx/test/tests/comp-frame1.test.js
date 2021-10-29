import {tst, apx} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    it("frame-page-1", function() {
        let Comp = {
            extends: apx.JcFrame,
            template: `
                <decor-page>
                frame page
                </decor-page>`,
        }
        let comp = tst.vueMount(Comp)
    })

    it("frame-dialog-1", function() {
        let Comp = {
            extends: apx.JcFrame,
            template: `
                <decor-dialog>
                frame dialog
                </decor-dialog>`,
        }
        let comp = tst.vueMount(Comp)
    })

})

