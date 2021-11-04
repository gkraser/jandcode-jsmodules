import {assert} from 'chai'
import * as m from '../../src/url'

describe("utils/url", function() {

    it("deparams", function() {
        assert.deepEqual(m.deparams(''), {})
        assert.deepEqual(m.deparams(), {})
        assert.deepEqual(m.deparams('a=1'), {a: '1'})
        assert.deepEqual(m.deparams('a=1&z=2'), {a: '1', z: '2'})
        assert.deepEqual(m.deparams('a'), {a: ''})
        assert.deepEqual(m.deparams('a='), {a: ''})
    })

    it("deparams hash", function() {
        assert.deepEqual(m.deparams('#'), {})
        assert.deepEqual(m.deparams('#a=1'), {a: '1'})
        assert.deepEqual(m.deparams('#a=1&z=2'), {a: '1', z: '2'})
        assert.deepEqual(m.deparams('#a'), {a: ''})
        assert.deepEqual(m.deparams('#a='), {a: ''})
    })

    it("isAbs", function() {
        assert.equal(m.isAbs(''), false)
        assert.equal(m.isAbs('http://hello'), true)
        assert.equal(m.isAbs('svg:bus'), false)
    })

    it("params", function() {
        assert.equal(m.params(null), '')
        assert.equal(m.params({}), '')
        assert.equal(m.params({a: 1}), 'a=1')
        assert.equal(m.params({
            a: 1, b: 'q', c: 'привет'
        }), 'a=1&b=q&c=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82')
    })

})
    