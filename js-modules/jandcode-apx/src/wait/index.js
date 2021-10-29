//
import '../vue'
import {jcBase} from '../vendor'
import {WaitUIService} from './wait-ui-service'

// инициализируем приложение
jcBase.app.registerService(WaitUIService)

export {
    WaitUIService
}