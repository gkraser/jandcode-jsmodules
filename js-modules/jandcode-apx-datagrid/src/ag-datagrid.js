import {Datagrid} from './dg'
import {Grid as AgGrid} from 'ag-grid-community';


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
        let res = {
            rowData: this.datagrid.data.getData(),
            columnDefs: []
        }

        for (let col of this.datagrid.columns) {
            res.columnDefs.push(this.makeColOptions(col))
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