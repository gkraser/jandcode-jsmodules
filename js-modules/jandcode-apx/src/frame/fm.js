import {Vue, jcBase} from '../vendor'
import {createVueApp} from '../vue'

/**
 * Зарегистрированные showers
 */
let _showers = {}

/**
 * Имя shower по умолчанию
 */
let _defaultShowerName = 'main'

/**
 * Обертка вокруг vue-компонента фрейма.
 */
export class FrameWrapper {

    constructor() {
    }

}

/**
 * Показывальщик фреймов
 */
export class FrameShower {

    constructor() {
    }

    /**
     * Показать указанный FrameWrapper.
     * @param fw {FrameWrapper} что показать
     * @return {Promise<void>}
     */
    async showFrameWrapper(fw) {
        throw new Error("Not implemented showFrameWrapper")
    }

    /**
     * Закрыть фрейм с указанной командой
     * @param fw {FrameWrapper} что закрывать. Гарантированно принадлежит этому shower
     * @param cmd
     */
    closeFrameWrapper(fw, cmd) {
        throw new Error("Not implemented closeFrameWrapper")
    }

    /**
     * Возвращает true, если фрейм возможно закрыть.
     * Например диалог всегда можно закрыть,
     * а фрейм на main - только если он не первый в стеке.
     * @param fw {FrameWrapper}
     */
    isFrameWrapperClosable(fw) {
        return true
    }

    /**
     * Уничтожить shower
     */
    destroy() {
    }

}

async function resolveFrameComp(options) {
    //todo полный resolve
    return options.frame
}

/**
 * Зарегистрировать shower
 * @param name имя
 * @param {FrameShower} shower экземпляр shower
 */
export function registerShower(name, shower) {
    _showers[name] = shower
}

/**
 * Отменить регистрацию shower
 * @param name имя
 */
export function unregisterShower(name) {
    delete _showers[name]
}

/**
 * Получить shower по имени.
 * @return {FrameShower}
 */
export function getShower(name) {
    let res = _showers[name]
    if (!res) {
        res = _showers[_defaultShowerName]
    }
    if (!res) {
        throw new Error("Не найден shower: " + name)
    }
    return res
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