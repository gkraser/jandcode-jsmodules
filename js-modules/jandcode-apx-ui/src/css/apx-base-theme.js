/* Тема apx-base

Базовая тема. В ее рамкох разрабатываются компоненты.

----------------------------------------------------------------------------- */
import robotoFonts from './fonts/roboto'
import cssQuasar from 'quasar/dist/quasar.css'
import css from './apx-base/index.less'

export default {
    css: [...Object.values(robotoFonts), cssQuasar, css],
}
