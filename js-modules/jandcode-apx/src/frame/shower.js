/**
 * Показывальщик фреймов
 */
export class FrameShower {

    constructor() {
        // все мои текущие работающие фреймы
        this._frames = []
    }

    /**
     * Уничтожить shower
     */
    destroy() {
        for (let fw of this._frames) {
            fw.destroy()
        }
        this._frames = null
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
     * Активировать фрейм.
     * Все, которые после него - закрыть.
     * @param fw
     */
    async activateFrameWrapper(fw) {
    }

    /**
     * Все текущие фреймы в shower
     */
    getFrames() {
        return this._frames
    }

}
