/* Утилиты для lang и locale
----------------------------------------------------------------------------- */
import cfg from './cfg'


let _fallbackLang = 'en'

cfg.setDefault({

    /**
     * Язык приложения строчными буквами (ru, en...).
     * Если не установлен, то определяется автоматически
     */
    lang: ''

})

/**
 * Возвращает текущий язык приложения
 */
export function getLang() {
    if (cfg.lang) {
        return cfg.lang
    }
    return getBrowserLang()
}

/**
 * Возвращает язык по умолчанию для браузера строчными буквами.
 */
export function getBrowserLang() {
    let z = window.navigator.language
    if (!z) {
        return _fallbackLang
    }
    let a = z.indexOf('-')
    if (a !== -1) {
        z = z.substring(0, a)
    }
    return z.toLowerCase()
}
