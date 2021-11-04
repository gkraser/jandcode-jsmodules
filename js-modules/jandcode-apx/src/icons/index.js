/* Основной стандартный набор иконок
----------------------------------------------------------------------------- */

import {registerIcons} from '../utils/icons'
import {quasarIcons} from './quasar-iconSet'

/**
 * Инициализация стандартного набора иконок
 */
function init() {
    registerIcons(quasarIcons)
}

init()
