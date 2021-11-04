/*
    vue-loader для jandcode

    Вызывает стандартный vue-loader, а затем делает style inject для jandcode.
    Когда style inject появится в оригинальном vue-loader, может быть удален.

    Имя файла должно быть vue-loader.js, иначе его не видит vue-плагин!
 */

let origVueLoader = require('vue-loader').default
let vueStyleInjectLoader = require('./vue-style-inject-loader')

module.exports = function(source, map, meta) {
    // вызываем оригинальный vue-loader
    let source1 = origVueLoader.call(this, source, map, meta)
    // делаем inject для стилей
    return vueStyleInjectLoader.call(this, source1, map, meta)
}