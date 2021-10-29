/* msgbox
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'
import {MsgboxService} from './app-service-msgbox'

// инициализируем приложение
jcBase.app.registerService(MsgboxService)

export async function showYn(msg, onYes) {
    return jcBase.app.msgbox.showYn(msg, onYes)
}

export async function showMsg(msg) {
    return jcBase.app.msgbox.showMsg(msg)
}

export async function showError(err) {
    return jcBase.app.msgbox.showError(err)
}

export {
    MsgboxService
}