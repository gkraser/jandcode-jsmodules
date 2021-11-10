/* Тема apx-std

Стандартная тема. Дополняет тему apx-base настройкой окончательного внешнего вида.

----------------------------------------------------------------------------- */
import apxBase from './apx-base-theme'
import css from './apx-std/index.less'

export default {
    css: [...apxBase.css, css],
}
