
import * as vue from 'vue'

export function createVueApp(comp) {
    let vueApp = vue.createApp(comp)
    return vueApp
}

