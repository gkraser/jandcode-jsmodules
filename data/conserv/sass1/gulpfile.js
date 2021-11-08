/*

Скрипты для quasar.

При выходе новой версии quasar необходимо запустить:

    jc @ gulp quasar-prepare

Затем файлы quasar-fix.css, q-fix-px.less скопировать в каталог src/css/apx-base/gen


----------------------------------------------------------------------------- */

let gulp = require('gulp')
let sass = require('sass');
let fs = require('fs')
let path = require('path')

let jcTools = require('@jandcode/tools')
let quasar_css_pxtorem = require('./tools/quasar-css-pxtorem')

quasar_css_pxtorem()

/*
    Компилирование quasar.sass с перекрытими переменными
 */
gulp.task('quasar-compile-sass', function(cb) {
    let quasarFileCss = jcTools.normSlash(require.resolve('quasar/dist/quasar.css'))
    let quasarFile = jcTools.normSlash(require.resolve('quasar/dist/quasar.sass'))
    let varsFile = jcTools.normSlash(require.resolve('./src/css/apx-base/quasar-sass/quasar-vars.sass'))

    const result = sass.renderSync({
        indentedSyntax: true,
        data: `
@import '${varsFile}'        
@import '${quasarFile}'        
        `,
    });

    let outFile = path.resolve('./temp/quasar-fix.css')
    jcTools.saveFile(outFile, result.css.toString())

    let outOrigFile = path.resolve('./temp/quasar-orig.css')
    fs.copyFileSync(quasarFileCss, outOrigFile)

    console.info("out file:", outFile);
    console.info("orig file:", outOrigFile);

    cb()
})

function quasarPrepareTask(cb) {
    console.info("OK");
    cb()
}

gulp.task('quasar-prepare', gulp.series('quasar-compile-sass', 'quasar-pxtorem', quasarPrepareTask))
