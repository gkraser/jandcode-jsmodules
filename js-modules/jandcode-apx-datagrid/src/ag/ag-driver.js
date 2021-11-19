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
        this.pixelCalc = new apx.jcBase.dom.PixelCalc({
            parentElements: [
                this.el,
                'ag-theme-balham',
                'ag-row',
                'ag-cell',
            ],
            targetElement: '.ag-cell',
        })
    }

    destroy() {
        if (this.agGrid) {
            this.agGrid.destroy()
            this.agGrid = null
        }
        if (this.pixelCalc) {
            this.pixelCalc.destroy()
            this.pixelCalc = null
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

        // высота строки
        if (dg.getRowHeight()) {
            res.rowHeight = this.pixelCalc.getHeight(dg.getRowHeight())
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
            type: [],
        }
        if (col.getAlign() === 'right') {
            res.type.push('rightAligned')
        }
        if (col.getWidth()) {
            res.width = this.pixelCalc.getWidth(col.getWidth())
        }
        if (col.getMinWidth()) {
            res.minWidth = this.pixelCalc.getWidth(col.getMinWidth())
        }
        if (col.getMaxWidth()) {
            res.maxWidth = this.pixelCalc.getWidth(col.getMaxWidth())
        }
        if (col.getWrapText()!=null) {
            res.wrapText = col.getWrapText()
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

    exportData(options) {
        let opts = Object.assign({}, options)

        let res = {
            columns: [],
            rows: [],
        }

        let dg = this.datagrid

        let agApi = this.agGrid.gridOptions.api
        let agColumnApi = this.agGrid.gridOptions.columnApi

        // все отображаемые колонки
        let agCols = agColumnApi.getAllDisplayedColumns()
        let cols = []
        for (let agCol of agCols) {
            cols.push({
                agCol: agCol,
                jcCol: dg.getColumnById(agCol.colId)
            })
        }

        // формируем описания колонок
        let index = 0
        for (let col of cols) {
            let z = {
                index: index++,
                colId: col.jcCol.getColId(),
                title: col.jcCol.getTitle(),
                field: col.jcCol.getField(),
            }
            res.columns.push(z)
        }

        // модель строк
        let rows = agApi.getModel()

        let cellParam = {
            value: null,
            displayValue: null,
            data: null,
            rowIndex: 0,
            column: null,
            datagrid: this.datagrid,
        }

        // текущее состояние строк: отфильтрованы и отсортированы
        rows.forEachNodeAfterFilterAndSort((node, index) => {
            let row = []

            cellParam.data = node.data
            cellParam.rowIndex = node.rowIndex

            for (let col of cols) {
                cellParam.column = col.jcCol
                cellParam.value = agApi.getValue(col.agCol, node)  //todo это очень медленно!
                cellParam.displayValue = null
                cellParam.displayValue = col.jcCol.getDisplayValue(cellParam)
                //
                row.push(cellParam.displayValue)
            }
            res.rows.push(row)
        })

        return res
    }

}
