import {tst, apx} from '../vendor'

import CellSimple1 from '../_components/CellSimple1'
import CellComplex1 from '../_components/CellComplex1'

let {h, createApp, render, createVNode} = apx.Vue


/**
 * @param options.countRows сколько строк
 */
function data1(options) {
    let opts = Object.assign({
        countRows: 5,
    }, options)
    let ut = new tst.RndUtils(opts.countRows * 1000)

    //
    let res = {
        data: [],
        dictadata: {}
    }

    for (let i = 1; i <= opts.countRows; i++) {
        let z = {
            id: i,
            label: 'label-' + i,
        }
        res.data.push(z)
    }

    return res
}

function createChildApp(appCfg, parentApp) {
    const app = createApp(appCfg)

    app.config.globalProperties = parentApp.config.globalProperties

    const {reload, ...appContext} = parentApp._context
    Object.assign(app._context, appContext)

    return app
}

function mount(component, {props, children, element, app} = {}) {
    let el = element

    let vNode = createVNode(component, props, children)
    if (app && app._context) vNode.appContext = app._context
    if (el) render(vNode, el)
    else if (typeof document !== 'undefined') render(vNode, el = document.createElement('div'))

    const destroy = () => {
        if (el) render(null, el)
        el = null
        vNode = null
    }

    return {vNode, destroy, el}
}


class VueRenderer {

    constructor(a, b) {
        console.info("constructor", a, b);
    }

    init(params) {
        console.info("init", params);
        // this.el = document.createElement('div')
        // this.el.innerHTML = params.fn(params)

        this.me = apx.vueUtils.mountComponent({
            component: CellComplex1,
            props: {
                text: params.value, texts2: params.data.id
            },
            app: params.parentVueComp
        })
    }

    getGui(a) {
        console.info("getGui", a);
        // return this.el
        return this.me.el
        // return '<span>HHH</span>'
    }

    destroy(a) {
        console.info("destroy", a);
        // this.el = null
        if (this.me) {
            this.me.destroy()
            this.me = null
        }
    }

    refresh(params) {
        console.info("refresh", params);
    }

}

/**
 * @param opt.countRows сколько записей
 */
export default function(options) {
    let opts = Object.assign({}, options)
    let parentVueComp = opts.parentVueComp

    let cols = [
        {
            title: "ID",
            field: "id",
        },
        {
            title: "Label",
            field: "label",
            onRenderCell: function(cell) {
                return cell.vue(CellSimple1, {text: cell.displayValue, text2: cell.data.id})
            }
        },
        {
            title: "Label2",
            field: "label",
            onRenderCell: function(cell) {
                return '!' + cell.value
            }
        },
        {
            title: "Label",
            field: "label",
            width: 280,
            minMidth: 280,
            onRenderCell: function(cell) {
                return cell.vue(CellComplex1, {text: cell.displayValue+"!", text2: cell.data.id})
            }
        },
    ]

    let res = {
        data: data1(opts),
        columns: cols,

        rowHeight: '2.2em',

        // agGridOptionsHandler(opts) {
        //     console.info("opts", opts);
        //     opts.columnDefs.push({
        //         headerName: 'f1',
        //         field: 'label',
        //         // __cellRenderer: function(params) {
        //         //     return 'AAA-' + params.value
        //         // },
        //         width: 270,
        //         minWidth: 270,
        //         cellRenderer: VueRenderer,
        //         cellRendererParams: {
        //             AAA_color: 'red',
        //             parentVueComp: parentVueComp,
        //             fn: function(params) {
        //                 return 'ZZZ' + params.value
        //             }
        //         }
        //     })
        // }
    }

    return res
}

