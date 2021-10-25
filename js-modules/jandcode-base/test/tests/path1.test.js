import chai from 'chai/chai'

import * as m from '../../src/path'

let {assert} = chai

describe(module.id, function() {

    let parse = function(src, res) {
        console.info('src:', src)
        let p = m.parse(src)
        console.log(p);
        if (res) {
            delete p.sourcePath
            assert.deepEqual(p, res, src)
        }
        return p
    }

    it("1", function() {
        let r1 = {
            "path": "a/b/c.txt",
            "isRoot": true,
            "filename": "c.txt",
            "ext": "txt",
            "dirname": "a/b",
            "basename": "c",
        }
        parse("/a/b/c.txt", r1)
        parse("///a\\\\b///c.txt", r1)

        let emptyRoot = {
            "path": "",
            "isRoot": true,
            "filename": "",
            "ext": "",
            "dirname": "",
            "basename": "",
        }

        parse("/", emptyRoot)
        parse("///\\/", emptyRoot)

        let empty = {
            "path": "",
            "isRoot": false,
            "filename": "",
            "ext": "",
            "dirname": "",
            "basename": "",
        }

        parse("", empty)
        parse(null, empty)

    })

})

