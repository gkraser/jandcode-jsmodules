import chai from 'chai/chai'

import * as m from '../../src/csv'

let {assert} = chai

describe(module.id, function() {

    it("1", function() {
        let b = new m.CsvBuilder()
        b.appendRowArray(['t1', 't"1'])
        b.appendRowArray(['t1,', 't"2'])
        let s = b.build()
        assert.equal(s, `"t1","t""1"
"t1,","t""2"`)
    })

})

