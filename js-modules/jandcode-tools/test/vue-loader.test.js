let {assert} = require('chai');

let path = require('path')
const webpack = require('webpack');

let wpUtils = require('./wp-utils')

describe(__filename, function() {

    it('test1', async function() {
        let config = wpUtils.wpConfig("entry1.js")
        let stats = await wpUtils.wpCompile(config)
    });

});
