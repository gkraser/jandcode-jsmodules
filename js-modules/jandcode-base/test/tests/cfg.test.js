import {assert} from 'chai'
import * as m from '../../src/cfg'
import * as cnv from '../../src/cnv'

describe("utils/cfg", function() {

    it("set", function() {
        let z = new m.Cfg()
        z.set({
            a: 1,
            b: {
                c: 2
            }
        })
        z.set({
            b: {
                d: 3
            }
        })
        assert.equal(z.a, 1)
        assert.equal(z.b.c, 2)
        assert.equal(z.b.d, 3)
    })

    it("setDefault", function() {
        let z = new m.Cfg()
        z.set({
            a: 1,
            b: {
                c: 2
            },
        })
        z.setDefault({
            b: {
                c: 1,
                d: 3
            },
            d: 4
        })
        assert.equal(z.a, 1)
        assert.equal(z.b.c, 2)
        assert.equal(z.b.d, 3)
        assert.equal(z.d, 4)
    })

    it("escape set props", function() {
        let z = new m.Cfg()
        z.set({
            a: 1,
            set: 2,
            setDefault: 3,
        })
        assert.ok(cnv.isFunction(z.set))
        assert.ok(cnv.isFunction(z.setDefault))
    })


})
    