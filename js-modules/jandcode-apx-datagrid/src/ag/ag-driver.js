import {apx} from '../vendor'
import {DatagridDriver} from '../datagrid'
import {Grid as AgGrid} from 'ag-grid-community';

let {render: vueRender} = apx.Vue

export class AgDatagridDriver extends DatagridDriver {

    /**
     * @param options.el где создавать гриду
     */
    constructor(options) {
        super(options)
        //
        this.el = this.options.el
    }

    destroy() {
        if (this.agGrid) {
            this.agGrid.destroy()
            this.agGrid = null
        }
        //
        super.destroy();
    }

    init(datagrid) {
        super.init(datagrid);
        //
        this.agGrid = new AgGrid(this.el, this.makeOptions())
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
        res.onSelectionChanged = (ev) => {
            let nodes = ev.api.getSelectedNodes()
            if (nodes) {
                let rowIndexes = nodes.map(n => n.rowIndex)
                let ev = {
                    datagrid: dg,
                    rowIndexes: rowIndexes
                }
                dg.getEventBus().emit('rowSelect', ev)
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
                col.getEventBus().emit('clickCell', cell)
                dg.getEventBus().emit('clickCell', cell)
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
