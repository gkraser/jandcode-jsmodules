//
import '../vue'
import {jcBase} from '../vendor'
import {ErrorHandlerService} from './error-handler-service'

// инициализируем приложение
jcBase.app.registerService(ErrorHandlerService)

export {
    ErrorHandlerService
}