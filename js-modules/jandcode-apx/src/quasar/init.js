import {Quasar} from '../vendor'
import {initVueApp} from '../vue'

initVueApp((vueApp) => {
    vueApp.use(Quasar.Quasar,{
        plugins:[
            Quasar.Dialog,
        ]
    })
})

