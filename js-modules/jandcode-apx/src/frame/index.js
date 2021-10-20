/* Фреймы
----------------------------------------------------------------------------- */

import JcFrame from './JcFrame'
import JcFrameShowerPage from './shower-page'
import {FrameShower_dialog} from './shower-dialog'

import {registerShower} from './fm'

export * from './fm'

registerShower('dialog', new FrameShower_dialog())

export {
    JcFrame,
    JcFrameShowerPage,
}