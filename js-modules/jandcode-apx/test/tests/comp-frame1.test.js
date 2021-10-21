import {tst, apx} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    it("frame-page-1", function() {
        let Comp = {
            extends: apx.JcFrame,
            template: `
                <jc-decor-page>
                frame page
                </jc-decor-page>`,
        }
        let comp = tst.vueMount(Comp)
    })

    it("frame-dialog-1", function() {
        let Comp = {
            extends: apx.JcFrame,
            template: `
                <jc-decor-dialog>
                frame dialog
                </jc-decor-dialog>`,
        }
        let comp = tst.vueMount(Comp)
    })

})

