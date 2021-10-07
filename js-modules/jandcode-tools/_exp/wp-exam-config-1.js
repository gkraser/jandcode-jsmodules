// как будет выглядеть использование webpack builder

let jcTools = require("@jandcode/tools")
let b = jcTools.createWebpakBuilder(__dirname)
// тут настраиваем b
module.exports = b.build()
