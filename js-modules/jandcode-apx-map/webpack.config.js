let jcTools = require("@jandcode/tools")
let builder = new jcTools.WebpackBuilder(__dirname)
// builder.merge({})  
module.exports = builder.build()
