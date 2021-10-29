/* Общая шина событий для приложения
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'
import mitt from 'mitt'

export class EventBusService extends jcBase.AppService {

    onCreate() {
        this.eventBus = mitt()

        /**
         * Глобальный Event Bus.
         * Просто vue-компонент.
         *
         * @member {mitt} App#eventBus
         */
        this.app.eventBus = this.eventBus
    }

    onStop() {
        this.eventBus.all.clear()
    }

}


