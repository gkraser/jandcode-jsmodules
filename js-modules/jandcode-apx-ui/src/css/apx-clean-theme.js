/* Тема apx-clean

Чистая тема quasar + все компоненты из apx-модулей

----------------------------------------------------------------------------- */
import robotoFonts from './fonts/roboto'
import cssQuasar from 'quasar/dist/quasar.css'
import css from './apx-clean/index.less'

export default {
    // quasarCss после css!
    //css: [...Object.values(robotoFonts), css, cssQuasar],
    css: [css, cssQuasar],
}
