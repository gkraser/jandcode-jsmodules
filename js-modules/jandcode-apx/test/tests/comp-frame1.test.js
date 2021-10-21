import {tst, apx} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    it("frame-page-1", function() {
        let Comp = {
            extends: apx.JcFrame,
            template: `
                <Page>
                frame page
                </Page>`,
        }
        let comp = tst.vueMount(Comp)
    })

    it("frame-dialog-1", function() {
        let Comp = {
            extends: apx.JcFrame,
            template: `
                <Dialog>
                frame dialog
                </Dialog>`,
        }
        let comp = tst.vueMount(Comp)
    })

})

