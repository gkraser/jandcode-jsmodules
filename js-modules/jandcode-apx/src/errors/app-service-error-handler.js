/* Обработка ошибок
----------------------------------------------------------------------------- */

import {Quasar, jcBase} from '../vendor'


export class ErrorHandlerService extends jcBase.AppService {

    onBeforeRun() {
        let th = this

        this.app.initVueApp((vueApp) => {
            vueApp.config.errorHandler = function(err, vm, info) {
                th.handleVueError(err, vm, info, 'error')
            }

            vueApp.config.warnHandler = function(err, vm, info) {
                th.handleVueError(err, vm, info, 'warn')
            }
        })

        this._onErrorOld = window.onerror
        this._onErrorNew = function(message, url, line, col, error) {
            th.handleWindowError(message, url, line, col, error)
        }
        window.onerror = this._onErrorNew

        this._unhandledrejection = function(event) {
            th.handleUnhandledRejection(event)
        }
        window.addEventListener("unhandledrejection", this._unhandledrejection);

    }

    onStop() {
        if (this._onErrorNew) {
            window.onerror = this._onErrorOld
        }
        if (this._unhandledrejection) {
            window.removeEventListener("unhandledrejection", this._unhandledrejection);
        }
    }

    //////

    /**
     * Обработать vue-ошибку или предупреждение
     * @param err
     * @param vm
     * @param info
     * @param ew  'error' | 'warn'
     */
    handleVueError(err, vm, info, ew) {
        let error = jcBase.createError(err)

        error.vm = vm
        error.info = `Apx: [Vue ${ew}] ${info}`

        this.showError(error)
        console.log('[ERROR] ' + error.info + ": " + error.message)
        console.log('vm', vm)
        this.showStack(err)
    }

    /**
     * Обработать ошибку window.onerror
     * @param message
     * @param url
     * @param line
     * @param col
     * @param error
     */
    handleWindowError(message, url, line, col, error) {
        let msg = `[Fatal error]: ${message} [${line}:${col}] ${url}`
        if (this.ignoreError(msg)) {
            return
        }
        console.error(msg)
        this.showError(message)
    }

    /**
     * Обработать ошибку unhandledrejection
     * @param event
     */
    handleUnhandledRejection(event) {
        let error = jcBase.createError(event.reason)

        console.log('[ERROR promise] ', error.message)
        console.log(event)
        this.showError(error)
        console.error(event.reason)
        event.preventDefault();
    }

    /**
     * Возвращает true на ошибки, которые нужно игнорировать
     * @param message проверяемый текст сообщения
     */
    ignoreError(message) {
        if (!message) {
            return false
        }
        if (message.indexOf('ResizeObserver loop') !== -1) {
            return true
        }
        return false
    }

    /**
     * Показать стек
     */
    showStack(err) {
        console.error(err);
    }

    /**
     * Показать ошибку
     */
    showError(err) {
        //todo сохранять ошибки во внутренний список, для дальнейшего показа/копирования...
        this.showErrorUi(err)
    }

    /**
     * Реализация показа ошибок в ui
     */
    showErrorUi(err) {
        err = jcBase.createError(err)
        setTimeout(function() {
            // внутри timeout, а то иногда warn приводит к зацикливанию
            Quasar.Notify.create({
                position: 'top-right',
                multiLine: true,
                color: 'negative',
                message: '' + err.message,
                icon: 'error',
                actions: [
                    {label: 'Закрыть', color: 'yellow'},
                ]
            })
        }, 50)
    }

}


