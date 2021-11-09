const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
let jcTools = require('@jandcode/tools')


let tempQuasarSass = path.resolve('./temp/quasar-sass')

/**
 * Изменяет текст quasar.sass таким образом, что бы переменные использовались как var()
 * @param sassText текст quasar.sass
 */
function sassVars(sassText) {
    let ar = sassText.split(/\r?\n/)
    //console.info("ar",ar);
    let posVars = ar.findIndex((s) => s.startsWith('*,'))
    console.info("posVars", posVars);
    let vars = {}
    let inBody = false
    let prevS = ''

    let needVar = (s) => {
        if (prevS.startsWith('.bg-') ||
            prevS.startsWith('.text-') ||
            s.startsWith('  --') ||
            s.indexOf('$z-') !==- 1 ||
            s.indexOf('$shadow-') !==- 1
        ) {
            return false
        }
        return true
    }

    let newAr = ar.map((s) => {
        if (s.startsWith('$')) {
            // переменная
            let a = s.indexOf(':')
            if (a !== -1) {
                let varName = s.substring(0, a).trim()
                let varValue = s.substring(a + 1).replace('!default', '').trim()
                vars[varName] = varValue
            }
        } else if (s.startsWith('*,')) {
            inBody = true
        } else if (inBody) {
            if (s.indexOf('\$') !== -1) {
                if (needVar(s)) {
                    // есть переменные и они нужны
                    console.info(s);
                }
            }
        }
        prevS = s
        return s
    })

    //console.info("vars", vars);
}

function initGulpTask() {


    gulp.task('quasar-copy-sass', function() {
        let quasarDir = path.dirname(require.resolve('quasar/package.json'))
        let srcMask = path.resolve(quasarDir, '**/*.sass')

        return gulp.src(srcMask)
            .pipe(gulp.dest(tempQuasarSass));
    });

    gulp.task('quasar-sass1', function(cb) {
        let quasarSass = path.resolve(tempQuasarSass, 'dist/quasar.sass')
        let sassText = fs.readFileSync(quasarSass).toString()
        sassVars(sassText)

        cb()
    })

}

module.exports = initGulpTask
