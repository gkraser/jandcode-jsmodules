import {assert} from 'chai'
import * as m from '@jandcode/base'

describe(module.id, function() {

    it("test 1", function() {
        assert.notOk('base' in m);
        assert.ok('nextId' in m);
    })

})
    