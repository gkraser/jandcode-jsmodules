/* Фреймы
----------------------------------------------------------------------------- */

import JcFrame from './JcFrame'
import JcFrameShowerPage from './shower-page'
import {FrameShower_dialog} from './shower-dialog'

import JcDecor from './JcDecor'
import JcDecorFrame from './JcDecorFrame'
import JcDecorApp from './JcDecorApp'

import {registerShower} from './shower'

export * from './fm'
export * from './shower'

registerShower('dialog', new FrameShower_dialog())

export {
    JcFrame,
    JcFrameShowerPage,
    JcDecor,
    JcDecorFrame,
    JcDecorApp,
}