/* Показ wait
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'

export class MsgboxService extends jcBase.AppService {

    onCreate() {
        /**
         * Показ сообщений
         * @type {Object}
         * @member App#msgbox
         */
        this.app.msgbox = {
            async showYn(msg, onYes) {
                throw new Error('Not implemented showYn')
            },

            async showMsg(msg) {
                throw new Error('Not implemented showMsg')
            },

            async showError(err) {
                throw new Error('Not implemented showError')
            },
        }
    }

}


