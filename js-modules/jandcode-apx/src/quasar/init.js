import {Quasar} from '../vendor'
import {initVueApp} from '../vue'

//todo сбор конфигурации для quasar по примеру initVueApp или аналога, что бы плагины можно было подключать
initVueApp((vueApp) => {
    vueApp.use(Quasar.Quasar, {
        plugins: [
            Quasar.Dialog,
        ]
    })
})

