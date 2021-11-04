import {Quasar} from '../vendor'
import {initVueApp} from '../vue'
import {quasarIconSet} from '../icons/quasar-iconSet'
import {quasar_iconMapFn} from '../utils/icons'
import langRu from 'quasar/lang/ru'

/**
 * Плагины quasar, которые включаются
 */
export let quasarPlugins = [
    Quasar.Dialog,
    Quasar.Notify,
    Quasar.Loading,
]

/**
 * Язык для quasar
 */
export let quasarLang = langRu

initVueApp((vueApp) => {
    vueApp.use(Quasar.Quasar, {
        plugins: quasarPlugins,
        iconSet: quasarIconSet,
        lang: quasarLang,
    })
    vueApp.config.globalProperties.$q.iconMapFn = (iconName) => {
        return quasar_iconMapFn(iconName)
    }
})

