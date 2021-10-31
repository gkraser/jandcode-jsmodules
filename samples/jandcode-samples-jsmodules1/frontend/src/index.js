import {apx} from './vendor'
import App from './App'
import Home from './frames/Home'

import theme from 'theme/app'
import icons from 'all/icons'

export function run() {
    apx.jcBase.applyTheme(theme)
    apx.icons.registerIcons(icons)

    let routes = [
        {path: '', frame: Home},
    ]

    apx.app.run(() => {
        apx.app.frameRouter.addRoutes(routes)

        let vueApp = apx.createVueApp(App)
        vueApp.mount(apx.jcBase.dom.getAppElement())
    })

}
