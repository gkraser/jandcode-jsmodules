let {assert} = require('chai');

let path = require('path')
let m = require('../src/module-utils')

describe(__filename, function() {

    function splitTest(p) {
        let a = m.splitPath(p)
        console.info(p, '->', a);
    }

    it('splitPath1', async function() {
        splitTest("vue/b")
        splitTest("vue")
        splitTest("@jandcode/tools/**/*/*.js")
        splitTest("@jandcode/tools")
        splitTest(path.resolve(__dirname, "./src/**/*.js"))
        splitTest(path.resolve(__dirname, ".."))
    });


    it('genDynModules1', async function() {
        let a

        a = m.genDynModules({
            masks: [
                path.resolve(__dirname, "../src/**/*.js")
            ]
        })

        console.info(a);
        console.info(a.code);
    });


});
