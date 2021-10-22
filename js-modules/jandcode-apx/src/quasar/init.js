import {Quasar} from '../vendor'
import {initVueApp} from '../vue'
import {quasarIconSet} from '../icons/quasar-iconSet'
import {quasar_iconMapFn} from '../utils/icons'

//todo сбор конфигурации для quasar по примеру initVueApp или аналога, что бы плагины можно было подключать
initVueApp((vueApp) => {
    vueApp.use(Quasar.Quasar, {
        plugins: [
            Quasar.Dialog,
        ],
        iconSet: quasarIconSet,
    })
    vueApp.config.globalProperties.$q.iconMapFn = (iconName) => {
        return quasar_iconMapFn(iconName)
    }
})

