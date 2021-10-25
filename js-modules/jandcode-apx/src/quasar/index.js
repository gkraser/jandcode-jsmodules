import {Quasar} from '../vendor'
import {initVueApp} from '../vue'
import {quasarIconSet} from '../icons/quasar-iconSet'
import {quasar_iconMapFn} from '../utils/icons'

/**
 * Плагины quasar, которые включаются
 */
export let quasarPlugins = [
    Quasar.Dialog,
    Quasar.Notify,
    Quasar.Loading,
]

initVueApp((vueApp) => {
    vueApp.use(Quasar.Quasar, {
        plugins: quasarPlugins,
        iconSet: quasarIconSet,
    })
    vueApp.config.globalProperties.$q.iconMapFn = (iconName) => {
        return quasar_iconMapFn(iconName)
    }
})

