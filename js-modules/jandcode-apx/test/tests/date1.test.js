import {assert} from '../vendor'
import * as m from '../../src/utils/date'

describe(__filename, function() {

    it("toStr", function() {
        let s

        s = m.toStr('2010-12-30')
        assert.equal(s, '2010-12-30')
        //
        s = m.toStr(new Date(2010, 11, 29)) // месяц с 0!!!
        assert.equal(s, '2010-12-29')
        //
        s = m.toStr(969642000000)
        assert.equal(s, '2000-09-23')
        //
    })

    it("toDisplayStr", function() {
        assert.equal(m.toDisplayStr('2010-12-30'), '30.12.2010')
        assert.equal(m.toDisplayStr('2010-30-12'), null)
    })

    it("today", function() {
        let s

        s = m.today()
        console.info("today", s);
    })

    it("parse", function() {
        let s

        assert.equal(m.parse('2009-12-23'), '2009-12-23')
        assert.equal(m.parse('23.12.2009', 'DD.MM.YYYY'), '2009-12-23')
        assert.equal(m.parse('23.12.200', 'DD.MM.YYYY'), null)
        assert.equal(m.parse('23.12.20', 'DD.MM.YYYY'), null)
        assert.equal(m.parse('sdfkjh', 'DD.MM.YYYY'), null)
    })

})

