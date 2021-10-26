import upperFirst from 'lodash/upperFirst'
import {jcBase} from '../vendor'

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
     * Проверить, что фрейм можно закрывать.
     * @param {FrameWrapper} fw фрейм
     * @param {String} cmd команда для закрытия ('ok', 'cancel', ...). По умолчанию - 'cancel'
     * @return {Promise<boolean>} возвращает false, если фрейм закрывать нельзя
     */
    async checkClose(fw, cmd = 'cancel') {

        if (!cmd) {
            cmd = 'cancel'
        }

        let vueInst = fw.vueInst
        if (!vueInst) {
            return true
        }

        let handlerName = 'on' + upperFirst(cmd)
        let handlerNameCloseCmd = 'onCloseCmd'

        if (jcBase.isFunction(vueInst[handlerName])) {
            // у фрейма есть обработчик onXxx
            if (await vueInst[handlerName](fw, cmd) === false) {
                return false // закрываться нельзя
            }
        } else if (jcBase.isFunction(vueInst[handlerNameCloseCmd])) {
            // у фрейма есть обработчик onCloseCmd
            if (await vueInst[handlerNameCloseCmd](fw, cmd) === false) {
                return false // закрываться нельзя
            }
        }

        if (jcBase.isFunction(fw.options[handlerName])) {
            // у фрейма есть обработчик onXxx
            if (await fw.options[handlerName](fw, cmd) === false) {
                return false // закрываться нельзя
            }
        } else if (jcBase.isFunction(fw.options[handlerNameCloseCmd])) {
            // у фрейма есть обработчик onCloseCmd
            if (await fw.options[handlerNameCloseCmd](fw, cmd) === false) {
                return false // закрываться нельзя
            }
        }

        // все разрешили закрытся
        return true
    }

    /**
     * Все текущие фреймы в shower
     */
    getFrames() {
        return this._frames
    }

}
