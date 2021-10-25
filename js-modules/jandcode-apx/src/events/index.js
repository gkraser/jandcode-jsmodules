//
import {jcBase} from '../vendor'
import {EventBusService} from './app-service-event-bus'

// инициализируем приложение
jcBase.app.registerService(EventBusService)

export {
    EventBusService
}