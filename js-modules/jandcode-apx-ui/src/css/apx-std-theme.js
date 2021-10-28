/* Тема apx-std

Стандартная тема. Основана на apx-base и настроена для использования в
качестве темы по умолчанию.

----------------------------------------------------------------------------- */
import robotoFonts from './fonts/roboto'
import cssQuasar from 'quasar/dist/quasar.css'
import css from './apx-std/index.less'

export default {
    //css: [...Object.values(robotoFonts), cssQuasar, css],
    css: [cssQuasar, css],
}
