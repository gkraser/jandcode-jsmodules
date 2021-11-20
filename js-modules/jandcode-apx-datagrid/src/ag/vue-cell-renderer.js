import {apx} from '../vendor'
import {VueComponentWrapper} from '../datagrid'

export class AgVueCellRenderer {

    init(params) {
        let jcDriver = params.jcDriver
        let jcCol = params.jcCol

        let cell = jcDriver.makeCell(params)
        let renderResult = jcCol.renderCell(cell)

        if (apx.jcBase.isString(renderResult)) {
            this.el = document.createElement('span')
            this.el.innerHTML = renderResult
        } else if (renderResult instanceof VueComponentWrapper) {
            this.vueComp = apx.vueUtils.mountComponent({
                component: renderResult.component,
                props: renderResult.props,
                app: jcDriver.vueApp,
            })
        } else {
            console.warn("render not return string or vue component", jcCol);
        }
    }

    getGui() {
        if (this.el) {
            return this.el
        }
        if (this.vueComp) {
            return this.vueComp.el
        }
    }

    destroy() {
        if (this.el) {
            this.el = null
        }
        if (this.vueComp) {
            this.vueComp.destroy()
            this.vueComp = null
        }
    }

}

