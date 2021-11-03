import {jcBase, Vue} from '../vendor'
import {createVueApp} from '../vue'
import {FrameWrapper} from './wrapper'
import {FrameRouter} from './router'
import {FrameHistory} from './history'
import {FrameShower_dialog} from './shower-dialog'

/**
 * Сервис для менеджера фреймов
 */
export class FrameManagerService extends jcBase.AppService {

    onCreate() {
        let frameManager = new FrameManager()

        /**
         * Текущий менеджер фреймов
         * @type {FrameManager}
         * @member App#frameManager
         */
        this.app.frameManager = frameManager

        /**
         * Роутер для фреймов
         * @type {FrameRouter}
         * @member App#frameRouter
         */
        this.app.frameRouter = frameManager.frameRouter
    }


    onAfterRun() {
        let hash = jcBase.url.getPageHash()
        let ri = this.app.frameRouter.resolve(hash)
        if (ri == null && hash !== '') {
            // если по текущему фрейму не удалось определить hash, то пробуем пустой,
            // т.е. переход на home
            hash = ''
            ri = this.app.frameRouter.resolve(hash)
        }
        if (ri != null) {
            this.app.frameManager.showFrame({
                frame: hash,
                __page__hash: hash, // hash, который привел к показу фрейма, сохраняем
            })
        }
        //
        let th = this

        this._popstate = function(e) {
            if (jcBase.cfg.envDev) {
                console.info("HISTORY POPSTATE", e);
            }
            th.app.frameManager.onPopstate(e)
        }
        window.addEventListener('popstate', this._popstate);
    }


    onStop() {
        if (this._popstate) {
            window.removeEventListener('popstate', this._popstate);
        }
    }
}

/**
 * Менеджер фреймов
 */
export class FrameManager {

    constructor() {
        // зарегистрированные shower
        this._showers = {}
        // router
        this.frameRouter = new FrameRouter()
        //
        this.history = new FrameHistory()
        //
        this.registerShower("dialog", new FrameShower_dialog())
    }

    ////// showers

    /**
     * Зарегистрировать shower
     * @param name имя
     * @param {FrameShower} shower экземпляр shower
     */
    registerShower(name, shower) {
        this._showers[name] = shower
    }

    /**
     * Отменить регистрацию shower
     * @param name имя
     */
    unregisterShower(name) {
        delete this._showers[name]
    }

    /**
     * Получить shower по имени.
     * @return {FrameShower}
     */
    getShower(name) {
        let res = this._showers[name]
        if (!res) {
            throw new Error("Не найден shower: " + name)
        }
        return res
    }

    ////// routing

    /**
     * Реакция на событие popstate
     * @param e
     */
    onPopstate(e) {
        let hash = jcBase.url.getPageHash()
        let ri = this.frameRouter.resolve(hash)
        if (ri != null) {
            this.showFrame({frame: hash, __page__hash: hash})
        }
    }

    ////// showFrame

    /**
     * Для поля fw.frame делает настоящий фрейм в этом же поле
     * @param {FrameWrapper} fw
     * @return {Promise<void>}
     */
    async resolveFrameComp(fw) {
        if (fw.frame == null) {
            throw new Error("frame не указан для фрейма")
        }

        if (jcBase.isString(fw.frame)) {
            // заказана строка
            // возможно router знает про этот фрейм
            let routeInfo = this.frameRouter.resolve(fw.frame)
            if (routeInfo != null) {
                // да, знает
                fw.routeInfo = routeInfo
                // это фрейм
                fw.frame = routeInfo.frame
                // это параметры, объединяем с переданными, от route - важнее!
                fw.props = Object.assign(fw.props, routeInfo.params)
                //
                if (fw.options.__page__hash) {
                    // фрейм пришел по настоянию адресной строки
                    fw.fromUrl = true
                    delete fw.options.__page__hash
                }
            }
        }

        if (jcBase.isString(fw.frame)) {
            // заказана строка, считаем ее полным именем модуля
            let mod = await jcBase.loadModule(fw.frame)
            fw.frame = mod.default || mod
        }

        if (fw.frame instanceof Promise) {
            fw.frame = await fw.frame
            if (fw.frame.default) {
                fw.frame = fw.frame.default
            }
        }

    }

    extractFrameInit(vueApp) {
        let res = []
        let comp = vueApp._component
        if (comp) {
            let frameInit = comp.frameInit
            if (frameInit) {
                res.push(frameInit)
            }
        }
        return res
    }

    /**
     * Показать фрейм
     * @param options параметры
     * @param options.frame фрейм
     * @param options.props свойства, который будут переданы фрейму
     * @param options.shower какой shower использовать, по умолчанию main
     * @param options.stack true - поместить фрейм в стек, если поддерживается shower
     * @param options.replace true - заменить последний показанный фрейм в стеке,
     * если поддерживается shower. Работает только совместно со stack=true
     * @return {Promise<FrameWrapper>}
     */
    async showFrame(options) {
        let frameWrapper = Vue.markRaw(new FrameWrapper(options))
        if (jcBase.cfg.envDev) {
            console.info("showFrame", frameWrapper.id, Object.assign({}, options))
        }

        // получаем shower
        let showerName = frameWrapper.options.shower || 'main'
        frameWrapper.shower = this.getShower(showerName)

        //todo обработка ошибок и чистка за собой всего вот этого
        jcBase.waitShow()
        try {
            // получаем компонент
            await this.resolveFrameComp(frameWrapper)

            // создаем
            let vueApp = createVueApp(frameWrapper.frame, frameWrapper.props)

            // сохраняем все что нужно
            frameWrapper.vueApp = vueApp

            // инициализаруем фрейм
            let frameInits = this.extractFrameInit(vueApp)
            if (frameInits.length > 0) {
                // имеются методы frameInit, вызываем их
                for (let fn of frameInits) {
                    await fn.call(null, frameWrapper)
                }
            }

            if (jcBase.cfg.envDev) {
                console.info("|--> frameWrapper", frameWrapper.id, frameWrapper)
            }
            
            // монтируем
            frameWrapper.vueMountEl = jcBase.dom.createTmpElement()
            frameWrapper.vueInst = vueApp.mount(frameWrapper.vueMountEl)

            // показываем
            await frameWrapper.shower.showFrameWrapper(frameWrapper)

        } finally {
            jcBase.waitHide()
        }

        // все
        return frameWrapper
    }
}

//////

export async function showFrame(options) {
    return await jcBase.app.frameManager.showFrame(options)
}


