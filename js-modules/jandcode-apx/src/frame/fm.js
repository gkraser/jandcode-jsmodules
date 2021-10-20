import {Vue, jcBase} from '../vendor'
import {createVueApp} from '../vue'
import {getShower} from './shower'

/**
 * Обертка вокруг vue-компонента фрейма.
 */
export class FrameWrapper {

    constructor() {
    }

}

async function resolveFrameComp(options) {
    //todo полный resolve
    return options.frame
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
    options = Object.assign({}, options)

    // получаем shower
    let shower = getShower(options.shower)

    // получаем компонент
    let frameComp = await resolveFrameComp(options)

    // формируем свойства
    let props = Object.assign({}, options.props)

    // создаем экземпляр frameWrapper и передаем его как не реактивное свойство
    let frameWrapper = new FrameWrapper()
    props.frameWrapper = Vue.markRaw(frameWrapper)

    // создаем
    let vueApp = createVueApp(frameComp, props)

    // инициализаруем фрейм
    //todo call frameInit

    // сохраняем все что нужно
    frameWrapper.vueApp = vueApp
    frameWrapper.shower = shower

    // монтируем
    frameWrapper.vueMountEl = jcBase.dom.createTmpElement()
    frameWrapper.vueInst = vueApp.mount(frameWrapper.vueMountEl)

    // показываем
    await shower.showFrameWrapper(frameWrapper)

    // все
    return frameWrapper
}