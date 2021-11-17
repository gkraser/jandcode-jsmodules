import {apx} from '../vendor'

/**
 * Экспортировать данные из гриды в csv-текст
 * @param exportData данные, полученные из Datagrid.exportData
 */
export function exportDataToCvsText(exportData) {
    let b = new apx.jcBase.csv.CsvBuilder({})
    let header = exportData.columns.map((z) => z.title)
    b.appendRowArray(header)
    for (let row of exportData.rows) {
        b.appendRowArray(row)
    }
    return b.build()
}

/**
 * Экспортировать данные из гриды в csv-текст для загрузки
 * @param exportData данные, полученные из Datagrid.exportData
 * @param filename имя загружаемого файла
 */
export function exportDataToCvsDownload(exportData, filename) {
    let text = exportDataToCvsText(exportData)
    if (!filename) {
        filename = 'data.csv'
    }

    //
    let a = document.createElement("a")
    let blob = new Blob([text], {type: 'text/csv'})
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
