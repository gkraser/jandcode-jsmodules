/* Сервис приложения для поддержки vue
----------------------------------------------------------------------------- */

import {jcBase, Vue} from '../vendor'

let _initers = []

export class VueService extends jcBase.AppService {

    constructor(app) {
        super(app)
        //
        this._initers = [..._initers]
    }

    onCreate() {
        // создаем фейковое приложение, потомучто без этого quasar не будет работать
        let vueApp = Vue.createApp()
        this.executeVueIniters(vueApp)
    }

    /**
     * Выполнить все инициализаторы для указанного vue-приложения
     * @param vueApp vue-приложение
     * @param comp корневой компонент, может отсутствовать
     */
    executeVueIniters(vueApp, comp) {
        for (let cb of this._initers) {
            cb(vueApp, comp)
        }
    }

}

function getVueService() {
    let vueSvc = jcBase.app.services["vueService"]
    if (!vueSvc) {
        throw new Error("Not registred VueService")
    }
    return vueSvc
}

/**
 * Создать проинициализированный экземпляр vue-приложения
 * @param comp
 * @return {*}
 */
export function createVueApp(comp) {
    let vueApp = Vue.createApp(comp)
    let vueSvc = getVueService()
    vueSvc.executeVueIniters(vueApp, comp)
    return vueApp
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
