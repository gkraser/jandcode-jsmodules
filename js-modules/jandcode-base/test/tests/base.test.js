import {assert} from 'chai/chai'
import * as m from '../../src/base'


describe("utils/base", function() {

    it("nextId", function() {
        assert.ok(m.nextId().match(/jc-\d+$/))
        assert.ok(m.nextId() !== m.nextId())
    })

    it('nextId prefix', function() {
        assert.ok(m.nextId('aa').match(/aa\d+$/))
        assert.ok(m.nextId('aa-').match(/aa-\d+$/))
    })

})
    