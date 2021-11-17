import {apx} from './vendor'
import {Datagrid} from './datagrid'
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
            rowData: dg.getData().getRows(),
            columnDefs: [],
            // не перемещать колонки
            suppressMovableColumns: true,

            defaultColDef: {
                // изменять размер всех колонок
                resizable: true,
            },

            // выделение строки
            rowSelection: 'single',

            // что бы текст в ячейках выделялся как обычный текст
            enableCellTextSelection: true,
            ensureDomOrder: true,
        }

        for (let col of dg.getColumns()) {
            res.columnDefs.push(this.makeColOptions(col))
        }

        let makeFlatColumns = (columnDef) => {
            let res = []
            let step = (columns) => {
                for (let col of columns) {
                    if (col.children != null) {
                        step(col.children)
                    } else {
                        res.push(col)
                    }
                }
            }
            step(columnDef)
            return res
        }

        // pinned
        if (dg.getPinnedColumns() > 0) {
            let flatColumnDef = makeFlatColumns(res.columnDefs)
            for (let i = 0; i < dg.getPinnedColumns(); i++) {
                flatColumnDef[i].pinned = 'left'
            }
        }

        // events

        //
        if (dg.getOnRowSelect()) {
            res.onSelectionChanged = (ev) => {
                let nodes = ev.api.getSelectedNodes()
                if (nodes) {
                    let rowIndexes = nodes.map(n => n.rowIndex)
                    let ev = {
                        datagrid: dg,
                        rowIndexes: rowIndexes
                    }
                    dg.getOnRowSelect()(ev)
                }
            }
        }

        //
        res.onCellClicked = (ev) => {
            let col = dg.getColumnById(ev.colDef.colId)
            if (col) {
                let cell = {
                    value: ev.value,
                    displayValue: ev.valueFormatted,
                    data: ev.data,
                    rowIndex: ev.rowIndex,
                    column: col,
                    datagrid: dg,
                    event: ev.event,
                }
                if (col.getOnClickCell()) {
                    col.getOnClickCell()(cell)
                }
                if (dg.getOnClickCell()) {
                    dg.getOnClickCell()(cell)
                }
            }
        }

        return res
    }

    makeColOptions(col) {
        let res = {
            field: col.getField(),
            headerName: col.getTitle(),
            colId: col.getColId(),
        }
        if (col.getAlign() === 'right') {
            res.type = 'rightAligned'
        }
        if (col.getColumns()) {
            res.children = []
            for (let childCol of col.getColumns()) {
                res.children.push(this.makeColOptions(childCol))
            }
        }

        let makeCell = (params) => {
            return {
                value: params.value,
                displayValue: params.valueFormatted,
                data: params.data,
                rowIndex: params.rowIndex,
                column: this.datagrid.getColumnById(params.colDef.colId),
                datagrid: this.datagrid,
            }
        }

        res.cellRenderer = (params) => {
            let cell = makeCell(params)
            let vnode = col.renderCell(cell)

            if (apx.jcBase.isString(vnode)) {
                return vnode
            }

            if (apx.jcBase.isObject(vnode)) {
                let el = document.createElement('div')
                vueRender(vnode, el)
                return el.firstElementChild
            }

            console.warn("render not return string or vnode", col);

            return ''
        }

        res.valueFormatter = (params) => {
            let cell = makeCell(params)
            return col.getDisplayValue(cell)
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

    exportData(options) { //todo переделать
        let api = this.driver.agGrid.gridOptions.api
        let s = api.getDataAsCsv({
            skipColumnGroupHeaders: true
        })
        return s
    }
}