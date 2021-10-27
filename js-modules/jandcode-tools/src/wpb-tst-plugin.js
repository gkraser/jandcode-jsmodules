let path = require('path')
let webpack = require('webpack')

let wpb = require('./webpack-builder')
let moduleUtils = require('./module-utils')

let _counter = 0

/**
 * tst плагин для WebpackBuilder
 */
class WpbTstPlugin extends wpb.WebpackBuilderPlugin {

    constructor(options) {
        super(options)
        //
        this.masks = []
        if (this.options.masks) {
            this.masks.push(...this.options.masks)
        }
    }

    buildConfig(builder) {
        _counter++
        let tmpDynFile = path.resolve(builder.basedir, `temp/tst-files-${_counter}.dyn.js`)
        moduleUtils.genDynModulesMainFile({
            masks: this.masks,
            filename: tmpDynFile,
            moduleInfo: {
                tst: true
            }
        })
        return {
            entry: {
                tst: {
                    import: [tmpDynFile, '@jandcode/tst'],
                    filename: 'tst.bundle.js',
                }
            },
        }
    }
}

module.exports = WpbTstPlugin