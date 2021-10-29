import {apx} from '../vendor'
import ShowMsg from './ShowMsg'
import ShowYn from './ShowYn'
import ShowError from './ShowError'

export class MsgboxUiService extends apx.jcBase.AppService {

    onCreate() {
        super.onCreate();
        //
        this.app.msgbox.showYn = async function(msg, onYes) {
            return await apx.showFrame({
                shower: 'dialog',
                frame: ShowYn,
                props: {
                    text: msg
                },
                onYes: onYes
            })
        }
        this.app.msgbox.showMsg = async function(msg) {
            return await apx.showFrame({
                shower: 'dialog',
                frame: ShowMsg,
                props: {
                    text: msg
                }
            })

        }
        this.app.msgbox.showError = async function(err) {
            return await apx.showFrame({
                shower: 'dialog',
                frame: ShowError,
                props: {
                    text: err
                }
            })
        }
    }

}