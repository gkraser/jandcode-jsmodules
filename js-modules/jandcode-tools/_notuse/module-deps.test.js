let {assert} = require('chai');

let m = require('../src/module-deps')

describe(__filename, function() {

    it('test1', function() {
        let h = new m.ModuleHolder()
        h.addModule("chai")
        h.addModule("cross-env")
        h.addModule("mocha")
        console.info("h.getItems()", h.getNames());
    });

});
