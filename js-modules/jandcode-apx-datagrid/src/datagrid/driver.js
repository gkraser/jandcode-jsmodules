/**
 * Драйвер для datagrid. Отвечает за физическую реализацию гриды.
 */
export class DatagridDriver {

    constructor(options) {
        this.options = Object.assign({}, options)
    }

    destroy() {
        this.datagrid = null
    }

    /**
     * Инциализация драйвера для указанной гриды
     */
    init(datagrid) {
        this.datagrid = datagrid
    }

}