let jcTools = require('@jandcode/tools')
let b = jcTools.createWebpackBuilder(__dirname)
if (!b.isProd) {
    b.addEntryMainImport('@jandcode/tst','./tst-modules.dyn.js')
}
module.exports = b.build()
