let modUtils = require('./module-utils')

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
                    //

                    let modName = modUtils.fileToModuleId(fullName)

                    if (modName == null) {
                        cnt++
                        modName = 'NOT-FOUND/my-mod--' + cnt
                    }

                    let moduleId = modName

                    if (dups[moduleId]) {
                        cnt++
                        moduleId += "--" + cnt
                    }
                    dups[moduleId] = "1"

                    chunkGraph.setModuleId(module, moduleId);

                }


                /*
                const chunkGraph = compilation.chunkGraph;
                const context = this.options.context
                    ? this.options.context
                    : compiler.context;

                const usedIds = getUsedModuleIds(compilation);
                const modulesInNaturalOrder = Array.from(modules)
                    .filter(m => {
                        if (!m.needId) return false;
                        if (chunkGraph.getNumberOfModuleChunks(m) === 0) return false;
                        return chunkGraph.getModuleId(module) === null;
                    })
                    .sort(
                        compareModulesByPreOrderIndexOrIdentifier(compilation.moduleGraph)
                    );
                for (const module of modulesInNaturalOrder) {
                    const ident = getFullModuleName(module, context, compiler.root);
                    const hash = createHash(options.hashFunction);
                    hash.update(ident || "");
                    const hashId = (hash.digest(
                        options.hashDigest
                    ));
                    let len = options.hashDigestLength;
                    while (usedIds.has(hashId.substr(0, len))) len++;
                    const moduleId = hashId.substr(0, len);
                    chunkGraph.setModuleId(module, moduleId);
                    usedIds.add(moduleId);
                }
                */
            });
        });
    }
}

module.exports = ModuleIdsPlugin
