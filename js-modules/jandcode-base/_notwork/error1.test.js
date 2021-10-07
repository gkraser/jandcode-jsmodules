import {assert} from 'chai'
import {test, jsaBase} from './vendor'

describe(__filename, function() {

    it("text", function() {
        let e = jsaBase.createError("hello")
        assert.ok(e instanceof jsaBase.JcError)
        assert.equal(e.getMessage(), 'hello')
    })

    it("message:text", function() {
        let e = jsaBase.createError({message: 'hello'})
        assert.ok(e instanceof jsaBase.JcError)
        assert.equal(e.getMessage(), 'hello')
    })

    it("Error", function() {
        let e = jsaBase.createError(new Error('hello'))
        assert.ok(e instanceof jsaBase.JcError)
        assert.equal(e.getMessage(), 'hello')
    })

    it("status/statusText", function() {
        let e = jsaBase.createError({status: 4, statusText: 'no'})
        assert.ok(e instanceof jsaBase.JcError)
        assert.equal(e.getMessage(), '4 no')
        //
        e = jsaBase.createError({status: 4, statusText: null})
        assert.equal(e.getMessage(), '4')
        //
        e = jsaBase.createError({status: null, statusText: 'no'})
        assert.equal(e.getMessage(), 'no')
    })

})
    