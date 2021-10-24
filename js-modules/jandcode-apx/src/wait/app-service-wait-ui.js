/* Показ wait
----------------------------------------------------------------------------- */

import {Vue, Quasar, jcBase} from '../vendor'

class ApxWaitUI extends jcBase.WaitUI {

    show() {
        let loadingProps = {
            delay: 0,
            spinner: Quasar.QSpinnerGears,
            spinnerColor: 'deep-orange-6',
            backgroundColor: 'white',
        }
        let loadingProps2 = jcBase.extend({}, loadingProps, {backgroundColor: 'black'})
        Quasar.Loading.show(loadingProps)
        this.timerId = setTimeout(() => {
            Quasar.Loading.show(loadingProps2)
        }, 2000)
    }

    hide() {
        if (this.timerId) {
            window.clearTimeout(this.timerId)
            this.timerId = null
        }
        Quasar.Loading.hide()
    }

}

export class WaitUIService extends jcBase.AppService {

    onBeforeRun() {
        this.waitUI = new ApxWaitUI()
        jcBase.setWaitUI(this.waitUI)
    }

    onStop() {
        jcBase.setWaitUI(null)
    }

}


