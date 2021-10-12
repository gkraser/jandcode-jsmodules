let {assert} = require('chai');

let path = require('path')
let m = require('../src/svg-utils')

describe(__filename, function() {

    it('test1', async function() {
        let a

        a =m.genSvgIconsJs({
            masks: [
                path.resolve(__dirname, "icons/**/*.svg")
            ]
        })

        console.info(a);
    });


});
