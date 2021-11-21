import {apx} from '../vendor'
import {VueComponentWrapper} from '../datagrid'

/**
 * Рендер ячейки как строки или как vue-компонента
 */
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
            let el = this.vueComp.el
            if (el.childElementCount === 1) {
                el = el.firstElementChild
            }
            return el
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

