let {assert} = require('chai');

let m = require('../src/module-utils')

describe(__filename, function() {

    it('getModulePath: @ungap/promise-all-settled', function() {
        let p = m.getModulePath('@ungap/promise-all-settled')
        console.info("p", p);
    });

    it('getModulePath: mocha', function() {
        let p = m.getModulePath('mocha')
        console.info("p", p);
    });

    // it('getModulePath: fsevents', function() {
    //     let p = m.getModulePath('fsevents')
    //     console.info("p", p);
    // });

});
