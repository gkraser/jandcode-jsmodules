let moduleUtils = require('./module-utils')

//todo вроде как не нужен

/**
 * Проставляем id для модулей, привязанных к расположению файла относительно модуля.
 * Для модулей из node_modules ставит префикс node_modules.
 */
class ModuleIdsPlugin {

    constructor(options) {
        this.options = {}
    }

    apply(compiler) {
        let TAG = 'ModuleIdsPlugin'
        const options = this.options;
        compiler.hooks.compilation.tap(TAG, compilation => {
            compilation.hooks.moduleIds.tap(TAG, modules => {

                let chunkGraph = compilation.chunkGraph;
                let context = compiler.context;

                let dups = {}

                let cnt = 0
                for (let module of modules) {
                    let fullName = module.resource    // не факт!
                    if (!fullName) {
                        continue
                    }
                    if (fullName.startsWith("data:")) {
                        continue // что то типа: data:image/png;base64,.......
                    }

                    //

                    // console.info("ModuleIdsPlugin", fullName);

                    let modName
                    try {
                        let modInfo = moduleUtils.splitPath(fullName)
                        modName = modInfo.moduleName + "/" + modInfo.filePath
                    } catch(e) {
                        cnt++
                        modName = 'NOT-FOUND/my-mod--' + cnt
                    }

                    if (dups[modName]) {
                        cnt++
                        modName += "--" + cnt
                    }
                    dups[modName] = "1"

                    console.info("-->", modName);

                    chunkGraph.setModuleId(module, modName);

                }
            })
        })
    }
}

module.exports = ModuleIdsPlugin
