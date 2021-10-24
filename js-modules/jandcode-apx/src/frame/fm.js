import {Vue, jcBase} from '../vendor'
import {createVueApp} from '../vue'
import {getShower} from './shower'

/**
 * Обертка вокруг vue-компонента фрейма.
 */
export class FrameWrapper {

    constructor() {
        // уникальный id экземпляра
        this.id = jcBase.nextId("jc-frame-wrapper-")

        // опции, который были переданы в showFrame
        this.options = {}

        // ссылка на shower, который будет показывать этот фрейм
        this.shower = null

        // vue приложение для этого фрейма (создано через createVueApp)
        this.vueApp = null

        // экземпляр vue (создано через vueApp.mount(vueMountEl)
        this.vueInst = null

        // el, куда примонтирован экземпляр vue
        this.vueMountEl = null
    }

    /**
     * Уничтожить фрейм
     */
    destroy() {
        if (this.vueApp != null) {
            this.vueApp.unmount()
        }
        if (this.options != null && this.options.props != null) {
            this.options.props.frameWrapper = null
        }
        this.options = null
        this.shower = null
        this.vueApp = null
        this.vueInst = null
        if (this.vueMountEl != null) {
            this.vueMountEl.remove()
        }
        this.vueMountEl = null
    }
}

async function resolveFrameComp(options) {
    //todo полный resolve
    return options.frame
}

function extractFrameInit(vueApp) {
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
 * @return {Promise<FrameWrapper>}
 */
export async function showFrame(options) {
    // делаем копию опций
    let opts = Object.assign({}, options)
    opts.props = Object.assign({}, opts.props)

    // получаем shower
    let shower = getShower(opts.shower)

    // создаем экземпляр frameWrapper и передаем его как не реактивное свойство
    let frameWrapper = new FrameWrapper()
    frameWrapper.options = opts
    frameWrapper.shower = shower
    opts.props.frameWrapper = Vue.markRaw(frameWrapper)

    //todo обработка ошибок и чистка за собой всего вот этого
    jcBase.waitShow()
    try {
        // получаем компонент
        let frameComp = await resolveFrameComp(opts)

        // создаем
        let vueApp = createVueApp(frameComp, opts.props)

        // сохраняем все что нужно
        frameWrapper.vueApp = vueApp

        // инициализаруем фрейм
        let frameInits = extractFrameInit(vueApp)
        if (frameInits.length > 0) {
            // имеются методы frameInit, вызываем их
            for (let fn of frameInits) {
                await fn.call(null, frameWrapper)
            }
        }

        // монтируем
        frameWrapper.vueMountEl = jcBase.dom.createTmpElement()
        frameWrapper.vueInst = vueApp.mount(frameWrapper.vueMountEl)

        // показываем
        await shower.showFrameWrapper(frameWrapper)

    } finally {
        jcBase.waitHide()
    }

    // все
    return frameWrapper
}