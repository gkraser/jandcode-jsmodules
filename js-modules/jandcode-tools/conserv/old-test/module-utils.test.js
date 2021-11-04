let {assert} = require('chai');

let path = require('path')

let m = require('../src/module-utils')

describe(__filename, function() {

    it('not exists', function() {
        let z = m.getModuleByName('aaa')
        assert(!z.exists)
        assert(z.path === null)
    });

    it('exists', function() {
        let z = m.getModuleByName('mocha')
        assert(z.exists)
        assert(z.path.endsWith("mocha"))
    });

    it('files for not exists', function() {
        let z = m.getModuleFiles('aaa', "*.md")
        assert(z.length === 0)
    });

    it('files for exists', function() {
        let z = m.getModuleFiles('@jandcode/tools', "**/jc-modules*")
        assert(z.length === 1)
        assert(z[0].endsWith(".js"))
    });

    it('module by path', function() {
        let b = m.getModuleByName('@jandcode/tools')

        let z = m.getModuleByPath(path.resolve(b.path))
        assert(z.name === "@jandcode/tools")

        z = m.getModuleByPath(path.resolve(b.path, 'a/b/c'))
        assert(z.name === "@jandcode/tools")
    });

    it('module by path not exist', function() {
        let z = m.getModuleByPath('/a/b/c/d')
        console.info("z", z);
        assert(z.exists === false)
    });

    it('getDependNames', function() {
        let b = m.getModuleByName('@jandcode/tools')
        assert(b.getDependNames().indexOf('webpack') !== -1)
    });

    it('expandModuleDepends', function() {
        let b = m.expandModuleDepends({
            modules: "@jandcode/base",
            dev: false,
            fnFilter: (m) => {
                if (m.name.indexOf('-') !== -1) {
                    return false
                }
            }
        })
        let names = b.map(it => it.name)
        assert(names.indexOf('axios') !== -1)
        assert(names.indexOf('@jandcode/base') !== -1)
    });

    it('fileToModule', function() {
        let b = m.fileToModule(__filename)
        assert(b === '@jandcode/tools/test/module-utils.test.js')
    });

});
