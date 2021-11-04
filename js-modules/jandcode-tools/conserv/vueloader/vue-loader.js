let loaderUtils = require('loader-utils')
let path = require('path')
let qs = require('querystring')
let compiler = require('vue-template-compiler')
let vcu = require('@vue/component-compiler-utils')
let VirtualModulesPlugin = require('webpack-virtual-modules');
let vueNormalizePath = require.resolve('./runtime/vue-normalize')

module.exports = function(source) {
    let loaderContext = this
    let {
        resourcePath,
    } = loaderContext

    let isWatch = loaderContext._compiler.options.watch
    let importTag = ''
    if (isWatch) {
        importTag = '?t=' + Date.now()
    }

    // относительное имя для этого модуля
    let thisMod = "./" + path.basename(resourcePath)

    // ищем плагин VirtualModulesPlugin
    let vmp = null
    for (let p of loaderContext._compiler.options.plugins) {
        if (p instanceof VirtualModulesPlugin) {
            vmp = p
            break
        }
    }
    if (!vmp) {
        throw new Error("Not found VirtualModulesPlugin in webpack config")
    }

    // разбираем на запчасти
    let parts = vcu.parse({
        source: source,
        compiler: compiler,
        needMap: false,
    })

    if (!parts.template) {
        throw new Error(`template part not found in ${resourcePath}`)
    }
    if (!parts.script) {
        throw new Error(`script part not found in ${resourcePath}`)
    }

    let s, ext

    // script module
    ext = '.js'
    let script_import = thisMod + ext
    s = parts.script.content
    vmp.writeModule(resourcePath + ext, s)

    // render module
    ext = '.render.js'
    let render_import = thisMod + ext
    let render = vcu.compileTemplate({
        source: parts.template.content,
        compiler: compiler,
    })
    s = render.code + `
module.exports = {render,staticRenderFns}    
`
    vmp.writeModule(resourcePath + ext, s)

    // styles
    let styles_import_block = []
    let styles_import_vars = []
    if (parts.styles && parts.styles.length > 0) {
        for (let i = 0; i < parts.styles.length; i++) {
            let part = parts.styles[i]
            let lang = part.lang || 'css'
            let ext = '.style' + i + '.' + lang
            styles_import_block.push(`import style${i} from '${thisMod + ext + importTag}'`)
            styles_import_vars.push(`style${i}`)
            vmp.writeModule(resourcePath + ext, part.content)
        }
    }

    // main
    let normalize_import = loaderUtils.stringifyRequest(loaderContext, vueNormalizePath)
    let main_s = `\
import script from '${script_import + importTag}'    
import {render,staticRenderFns} from '${render_import + importTag}'
${styles_import_block.length > 0 ? styles_import_block.join('\n') : ''}    
import vueNormalize from ${normalize_import}

var component = vueNormalize(
  script,
  render,
  staticRenderFns,
  false,  // functional
  ${styles_import_vars.length > 0 ? '[' + styles_import_vars.join(',') + ']' : 'null'}    // styles
)
    
export default component.exports    
`

    return main_s
}

