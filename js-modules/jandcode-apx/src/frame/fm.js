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
 *
 * @param options
 * @param options.frame фрейм
 * @param options.props свойства, который будут переданы фрейму
 * @param options.shower какой shower использовать, по умолчанию main
 * @return {Promise<FrameWrapper>}
 */
export async function showFrame(options) {
    console.info("showFrame", options);
    // делаем копию
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

    console.info("vueApp", vueApp);

    // монтируем
    let vueMountEl = jcBase.dom.createTmpElement()
    let vueInst = vueApp.mount(vueMountEl)

    // сохраняем все что нужно
    frameWrapper.vueApp = vueApp
    frameWrapper.vueInst = vueInst
    frameWrapper.vueMountEl = vueMountEl
    frameWrapper.shower = shower

    console.info("vueInst", vueInst);

    // показываем
    await shower.showFrameWrapper(frameWrapper)

    // все
    return frameWrapper
}