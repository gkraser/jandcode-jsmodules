/* Сервис приложения для поддержки vue
----------------------------------------------------------------------------- */

//todo initVueApp переметр afterAll - тогда выполняется после всех остальных, что бы перекрывать компоненты без warn

import {jcBase, Vue} from '../vendor'

let _initers = []

export class VueService extends jcBase.AppService {

    constructor(app) {
        super(app)
        // личные initers сервиса
        this._initers = []
    }

    onCreate() {
        // создаем фейковое приложение, потому-что без этого quasar не будет работать
        this.createVueApp({})

        /**
         * см: {@link VueService.initVueApp}
         * @member App#initVueApp
         */
        this.app.initVueApp = (cb) => {
            this.initVueApp(cb)
        }
    }

    /**
     * Зарегистрировать инициализатор vue-приложения (см. функцию {@link initVueApp}).
     * Этот инициализатор будет выполнен после глобально зарегистрированных.
     * Ввводится для использования внутри других сервисов.
     */
    initVueApp(cb) {
        this._initers.push(cb)
    }

    /**
     * Создать проинициализированный экземпляр vue-приложения.
     * Параметры как в Vue.createApp.
     * @param comp
     * @param props
     * @return {*}
     */
    createVueApp(comp, props) {
        if (!comp) {
            throw new Error("createVueApp need param: comp")
        }
        let vueApp = Vue.createApp(comp, props)
        // сначала глобальные
        for (let cb of _initers) {
            cb(vueApp, comp)
        }
        // потом личные
        for (let cb of this._initers) {
            cb(vueApp, comp)
        }
        //
        return vueApp
    }

}

/**
 * Создать проинициализированный экземпляр vue-приложения
 * @param comp
 * @return {*}
 */
export function createVueApp(comp, props) {
    return jcBase.app.service("vueService").createVueApp(comp, props)
}

/**
 * Зарегистрировать инициализатор vue-приложения.
 * @param {Function} cb функция, параметры:
 * vueApp - экземпляр vue-приложения
 * comp - корневой компонент, может отсутствовать
 */
export function initVueApp(cb) {
    _initers.push(cb)
}
