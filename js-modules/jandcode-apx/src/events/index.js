//
import {jcBase} from '../vendor'
import {EventBusService} from './event-bus-service'

// инициализируем приложение
jcBase.app.registerService(EventBusService)

export {
    EventBusService
}