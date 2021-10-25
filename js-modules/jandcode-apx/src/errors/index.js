//
import '../vue'
import {jcBase} from '../vendor'
import {ErrorHandlerService} from './app-service-error-handler'

// инициализируем приложение
jcBase.app.registerService(ErrorHandlerService)

export {
    ErrorHandlerService
}