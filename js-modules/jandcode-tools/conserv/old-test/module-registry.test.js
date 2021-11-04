let {assert} = require('chai');

let path = require('path')

let m = require('../src/module-registry')

describe(__filename, function() {

    it('genJsModuleReqistry', function() {
        let r = m.createModuleRegistry()
        r.addData({
            'n1': 'f1',
            'n2': 'f2',
        })
        let b = r.genJs_dynModules()
        assert(b === `\
let a = require('@jandcode/base').moduleRegistry.addModule
a('n1',()=>import('f1'))
a('n2',()=>import('f2'))`)
    });

});
