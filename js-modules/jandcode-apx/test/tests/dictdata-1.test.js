import {apx, tst} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    it("updateDict", function() {
        let dd = new apx.Dictdata()
        dd.updateDict('dict1', [
            {id: 1, text: 't1', code: 'z1'},
            {id: 2, text: 't2', code: 'z2'},
        ])
        dd.updateDict('dict2', [
            {id: 11, text: 't11'},
            {id: 22, text: 't22'},
        ])
        dd.updateDict('dict2', [
            {id: 11, text: 't11-1'},
            {id: 33, text: 't33'},
        ])

        let res = {
            "dict1": {
                "1": {
                    "text": "t1",
                    "code": "z1"
                },
                "2": {
                    "text": "t2",
                    "code": "z2"
                }
            },
            "dict2": {
                "11": {
                    "text": "t11-1"
                },
                "22": {
                    "text": "t22"
                },
                "33": {
                    "text": "t33"
                }
            }
        }

        tst.assert.deepEqual(res, dd.getData())
    })

    it("updateData", function() {
        let dd = new apx.Dictdata()
        dd.updateData({
            "dict1": {
                "1": {
                    "text": "t1",
                    "code": "z1"
                },
                "2": {
                    "text": "t2",
                    "code": "z2"
                }
            },
        })
        dd.updateData({
            "dict1": {
                "1": {
                    "text": "t1-1",
                },
                "3": {
                    "text": "t2",
                    "code": "z2"
                }
            },
            "dict2": {
                "11": {
                    "text": "t11-1"
                },
                "22": {
                    "text": "t22"
                },
            }
        })

        let res = {
            "dict1": {
                "1": {
                    "text": "t1-1",
                    "code": "z1"
                },
                "2": {
                    "text": "t2",
                    "code": "z2"
                },
                "3": {
                    "text": "t2",
                    "code": "z2"
                }
            },
            "dict2": {
                "11": {
                    "text": "t11-1"
                },
                "22": {
                    "text": "t22"
                }
            }
        }

        tst.assert.deepEqual(res, dd.getData())
    })

    it("getValues", function() {
        let dd = new apx.Dictdata()
        dd.updateDict('dict1', [
            {id: 1, text: 't1', code: 'z1'},
            {id: 2, text: 't2', code: 'z2'},
        ])

        let v

        v = dd.getValues('dict1', 2)
        tst.assert.deepEqual(v, {text: 't2', code: 'z2'})

        v = dd.getValues('dict1', "2")
        tst.assert.deepEqual(v, {text: 't2', code: 'z2'})

        v = dd.getValues('dict1', 2222)
        tst.assert.deepEqual(v, {})
    })

    it("getValue", function() {
        let dd = new apx.Dictdata()
        dd.updateDict('dict1', [
            {id: 1, text: 't1', code: 'z1'},
            {id: 2, code: 'z2', text: 't2'},
        ])

        let v

        v = dd.getValue('dict1', 2)
        tst.assert.equal(v, 't2')

        v = dd.getValue('dict1', "2")
        tst.assert.equal(v, 't2')

        v = dd.getValue('dict1', 2222)
        tst.assert.equal(v, '')

        v = dd.getValue('dict1', 2, 'code')
        tst.assert.equal(v, 'z2')

        v = dd.getValue('dict1', 2, 'code___')
        tst.assert.equal(v, '')

    })


})

