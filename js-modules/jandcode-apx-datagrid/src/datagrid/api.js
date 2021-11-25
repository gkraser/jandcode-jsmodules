/**
 * Неформальное описание api для различных частей datagrid
 */
export let API = {

    datagrid_options: {
        columns: ['column_options'],
        store: {},
        pinnedColumns: Number,

        rowHeight: String,
        headerHeight: String,

        multiSelect: Boolean,

        onRowSelect: function() {},
        onClickCell: function() {},
    },

    column_options: {
        type: String,
        field: String,
        title: String,
        align: String,
        colId: String,

        width: String | Number,
        minWidth: String | Number,
        maxWidth: String | Number,

        wrapText: Boolean,

        dict: String,
        dictField: String,

        columns: ['colum_options'],

        onDisplayValue: function() {},
        onRenderCell: function() {},

        onClickCell: function() {},
    },

    /**
     * Параметр для обработчиков, которые работают с ячейкой
     */
    cell: {
        value: Object,
        diaplayValue: String,
        data: Object,
        rowIndex: Number,
        column: 'DatagridColumn',
        datagrid: 'Datagrid',
        event: 'DomEvent',
        store: 'Store',
        vue: function(component, props) {}
    },

    rows: {
        datagrid: 'Datagrid',
        rowIndexes: Array
    },

    /**
     * Функция для получения текстовоко представления значения.
     * Например дата может быть преобразовано в определенный формат, значение
     * словаря может быть получено.
     * @param cell для какой ячейки (см {@link API.cell})
     * @return {String} текст значения
     */
    onDisplayValue: function(cell) {},

    /**
     * Функция для получения html для ячейки.
     * @param cell для какой ячейки (см {@link API.cell})
     * @return {VNode} виртуальная vue-node
     */
    onRenderCell: function(cell) {},

    /**
     * Обработчик события: изменились выделенные строки
     * @param ev информация о выделенных строках (см {@link API.rows})
     */
    onRowSelect: function(ev) {},

    /**
     * Обработчик события: click по ячейке
     * @param ev информация о ячейке (см {@link API.cell})
     */
    onClickCell: function(ev) {},

}
