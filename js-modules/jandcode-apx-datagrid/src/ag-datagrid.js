import {apx} from './vendor'
import {Datagrid} from './dg'
import {Grid as AgGrid} from 'ag-grid-community';

let {render: vueRender} = apx.Vue

class AgDriver {

    constructor(datagrid, el) {
        this.datagrid = datagrid
        this.agGrid = new AgGrid(el, this.makeOptions())
    }

    destroy() {
        if (this.agGrid) {
            this.agGrid.destroy()
            this.agGrid = null
        }
    }

    makeOptions() {
        let dg = this.datagrid
        let res = {
            rowData: dg.data.getRows(),
            columnDefs: [],
            // не перемещать колонки
            suppressMovableColumns: true,

            defaultColDef: {
                // изменять размер всех колонок
                resizable: true,
            },

            // выделение строки
            rowSelection: 'single',
        }

        for (let col of dg.columns) {
            res.columnDefs.push(this.makeColOptions(col))
        }

        // events

        //
        if (dg.onRowSelect) {
            res.onSelectionChanged = (ev) => {
                let nodes = ev.api.getSelectedNodes()
                if (nodes) {
                    let rowIndexes = nodes.map(n => n.rowIndex)
                    let ev = {
                        datagrid: dg,
                        rowIndexes: rowIndexes
                    }
                    dg.onRowSelect(ev)
                }
            }
        }

        //
        res.onCellClicked = (ev) => {
            let col = dg.getColumnById(ev.colDef.colId)
            if (col) {
                let cell = {
                    value: ev.value,
                    data: ev.data,
                    rowIndex: ev.rowIndex,
                    column: col,
                    datagrid: dg,
                    event: ev.event,
                }
                if (col.onCellClick) {
                    col.onCellClick(cell)
                }
                if (dg.onCellClick) {
                    dg.onCellClick(cell)
                }
            }
        }

        return res
    }

    makeColOptions(col) {
        let res = {
            field: col.field,
            headerName: col.title,
            colId: col.colId,
        }
        if (col.align === 'right') {
            res.type = 'rightAligned'
        }
        if (col.columns) {
            res.children = []
            for (let childCol of col.columns) {
                res.children.push(this.makeColOptions(childCol))
            }
        }

        if (apx.jcBase.isFunction(col.onCellRender)) {
            res.cellRenderer = (params) => {
                console.info("cell render",params);
                let cell = {
                    value: params.value,
                    data: params.data,
                    rowIndex: params.rowIndex,
                    column: this.datagrid.getColumnById(params.colDef.colId),
                    datagrid: this.datagrid,
                }
                let vnode = col.onCellRender(cell)
                if (!vnode && apx.jcBase.isObject(vnode)) {
                    console.warn("render not return vnode", col);
                }
                let el = document.createElement('div')
                vueRender(vnode, el)
                return el.firstElementChild
            }
        }

        return res
    }

}

/**
 * Реализация Datagrid для ag-grid
 */
export class AgDatagrid extends Datagrid {

    /**
     * @param options опции для {@link Datagrid}
     * @param el элемент, где будет жить ag-grid
     */
    constructor(options, el) {
        super(options)
        //
        this.driver = new AgDriver(this, el)
    }

    destroy() {
        super.destroy();
        //
        this.driver.destroy()
    }

}