import {tst, apx} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    it("decor1", function() {
        let Decor = {
            extends: apx.JcDecor,
            template: `
                <div>
                decor
                <slot name="default"></slot>
                </div>`,
            data() {
                return {
                    tag1: 'decor'
                }
            },
        }
        let Comp = {
            components: {
                Decor,
            },
            data() {
                return {
                    tag1: 'comp'
                }
            },
            template: `
                <Decor ref="z1">comp</Decor>`,
        }
        let comp = tst.vueMount(Comp)
        let decor = comp.$refs.z1
        //
        tst.assert.equal(comp.tag1, 'comp')
        tst.assert.equal(decor.tag1, 'decor')
        tst.assert.equal(decor.own.tag1, 'comp')
    })

})

