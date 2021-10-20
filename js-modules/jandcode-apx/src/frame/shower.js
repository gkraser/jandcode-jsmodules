/**
 * Зарегистрированные showers
 */
let _showers = {}

/**
 * Имя shower по умолчанию
 */
let _defaultShowerName = 'main'

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
