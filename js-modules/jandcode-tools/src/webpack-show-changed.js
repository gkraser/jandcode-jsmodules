let fs = require('fs')

/**
 * Плагин показывает измененные файлы при watch
 */
class ShowChangedWebpackPlugin {

    constructor(options) {
        this.options = {}
    }

    apply(compiler) {
        compiler.hooks.watchRun.tap(
            'ShowChangedWebpackPlugin',
            (compiler) => {
                if (compiler.modifiedFiles) {
                    let all = [...compiler.modifiedFiles]
                    let files = []
                    for (let f of all) {
                        let stat = fs.statSync(f)
                        if (stat.isFile()) {
                            files.push(f)
                        }
                    }
                    if (files.length > 0) {
                        console.log("Changed files:");
                        for (let f of files) {
                            console.log('    ', f);
                        }
                    }
                }
            }
        )
    }

}

module.exports = ShowChangedWebpackPlugin
