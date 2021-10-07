let wpb = require("./webpack-builder")
let path = require('path')
let gen = require('./gen')

module.exports = class Tst_WpbPlugin extends wpb.WebpackBuilderPlugin {

    constructor(options) {
        super(options)
        //
        this.masks = [
            'test/**/*.test.js',
            'test/**/*.test.vue',
            'src/**/_tst/**/*.test.js',
            'src/**/_tst/**/*.test.vue',
        ]
    }


    getMergeConfig() {
        let b = this.builder

        let fileTstModsGen = path.resolve(b.basedir, "temp/tst-modules.dyn.js")
        let tstImport = [fileTstModsGen, '@jandcode/tst']
        let tstModules = [b.basedir, '@jandcode/base']

        gen.gen_dynModules(fileTstModsGen, tstModules, this.masks)

        let res = {
            entry: {
                tst: {
                    import: tstImport,
                    filename: 'tst.bundle.js',
                }
            }
        }

        return res
    }
}

