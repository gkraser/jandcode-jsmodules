/* Тема base
----------------------------------------------------------------------------- */
import robotoFonts from './fonts/roboto'
import cssQuasar from 'quasar/dist/quasar.css'
import css from './apx-base-theme.less'

export default {
    css: [...Object.values(robotoFonts), cssQuasar, css],
}
