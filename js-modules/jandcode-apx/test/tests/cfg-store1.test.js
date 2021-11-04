import {tst} from '../vendor'

import * as m from '../../src/utils/cfg-store'

describe('cfg-store1.test.js', function() {

    function create(key, keepStore) {
        key = "test:" + key
        if (!keepStore) {
            window.localStorage.removeItem(key)
        }
        let z = m.createCfgStore(key)
        tst.assert.ok(z.autoSave === false)
        return z
    }

    it("1", function() {
        let z = create(this.test.title)

        z.applyDefault({
            a: 1,
            b: 2,
            c: {
                d: 1,
                e: 2
            }
        })

        z.applyDefault({
            a: 11,
            c: {
                f: 12
            },
            d: {
                d1: 22
            }
        })

        tst.assert.equal(z.configKey, "test:1")
        tst.assert.equal(z.cfg.a, 1)
        tst.assert.equal(z.cfg.b, 2)
        tst.assert.equal(z.cfg.d.d1, 22)
    })

    it("load-empty", function() {
        let z = create(this.test.title)
        z.load()
        tst.assert.equal(Object.keys(z.cfg).length, 0)
    })

    it("save-1", function() {
        let z = create(this.test.title)
        z.applyDefault({
            a: 1,
            b: {
                c: 2,
                d: 3
            }
        })
        tst.assert.equal(Object.keys(z.cfg).length, 2)
        z.cfg.a = 11
        z.cfg.b.c = 22
        z.save()

        //
        let z2 = create(this.test.title, true)
        z2.load()
        tst.assert.equal(Object.keys(z2.cfg).length, 0)
        z2.applyDefault({
            a: 1,
            b: {
                c: 2,
                d: 3
            }
        })
        tst.assert.equal(Object.keys(z2.cfg).length, 2)
        tst.assert.equal(z2.cfg.a, 11)

    })

    it("reset-1", function() {
        let z = create(this.test.title)
        z.applyDefault({
            a: 1,
            b: {
                c: 2,
                d: 3
            }
        })
        z.cfg.a = 11
        z.cfg.b.c = 22
        z.save()

        tst.assert.equal(z.cfg.a, 11)
        //

        z.reset()
        tst.assert.equal(z.cfg.a, 1)
        tst.assert.equal(z.cfg.b.c, 2)
    })


    it("reset-part-1", function() {
        let z = create(this.test.title)
        z.applyDefault({
            a: 1,
            b: {
                c: 2,
                d: 3,
                e: {
                    f: 4,
                    g: 5
                }
            }
        })
        z.cfg.b.c = 222
        z.cfg.b.e.f = 444

        tst.assert.equal(z.cfg.b.c, 222)
        tst.assert.equal(z.cfg.b.e.f, 444)

        //
        z.reset('xx.yy') // такого пути нет
        tst.assert.equal(z.cfg.b.c, 222)
        tst.assert.equal(z.cfg.b.e.f, 444)

        //
        z.reset('b.e')
        tst.assert.equal(z.cfg.b.c, 222)
        tst.assert.equal(z.cfg.b.e.f, 4)

    })

    it("reset-value-1", function() {
        let z = create(this.test.title)
        z.applyDefault({
            a: 1,
            b: {
                c: 2,
                d: 3,
                e: {
                    f: 4,
                    g: 5
                }
            }
        })
        z.cfg.b.c = 222
        z.cfg.b.e.f = 444

        //
        tst.assert.equal(z.cfg.b.e.f, 444)
        z.reset('b.e.f')
        tst.assert.equal(z.cfg.b.e.f, 4)

    })

    it("load-and-default-1", function() {
        let z = create(this.test.title)
        z.cfg.v1 = 'q1'
        z.cfg.v2 = 'q2'
        z.save()
        //
        let z2 = create(this.test.title, true)
        z2.load()
        z2.autoSave = true

        z2.applyDefault({
            v3: 'default-q3',
        })
        tst.assert.equal(z2.cfg.v2, undefined) // загружено, еще нет значения по умолчанию

        z2.applyDefault({
            v2: 'default-q2',
        })
        tst.assert.equal(z2.cfg.v2, 'q2') // теперь по умолчанию есть, но берется загруженное

        tst.assert.equal(z2.cfg.v1, undefined) // загружено, но нет значения по умолчанию
        tst.assert.equal(z2.cfg.v3, 'default-q3')
        tst.assert.equal(z2.__cfgLoaded.v1, 'q1')
    })

})

