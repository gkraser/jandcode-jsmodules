import {apx} from '../vendor'

let {addModule} = apx.jcBase.moduleRegistry

addModule('tst/tools/icons-all.vue', () => import('./IconsAll'), {
    label: 'Все иконки (all/icons)'
})

addModule('tst/tools/modules-api.vue', () => import('./ModulesApi'), {
    label: 'API основных модулей'
})

