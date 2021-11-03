let jcTools = require("@jandcode/tools")
let builder = new jcTools.WebpackBuilder(__dirname)
module.exports = builder.build()
