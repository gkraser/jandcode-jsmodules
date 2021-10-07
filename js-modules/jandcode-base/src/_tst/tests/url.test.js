import {assert} from 'chai'
import * as m from '../../url'

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

})
    