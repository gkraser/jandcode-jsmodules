import {apx} from '../vendor'
import lodashEscape from 'lodash/escape'

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

/**
 * Экспортировать данные из гриды в html-текст
 * @param exportData данные, полученные из Datagrid.exportData
 */
export function exportDataToHtmlText(exportData) {
    let res = []
    let header = exportData.columns.map((z) => '<td>' + lodashEscape(z.title) + '</td>')
    res.push('<table>')
    res.push('<thead>')
    res.push('<tr>' + header.join('') + '</tr>')
    res.push('</thead>')
    res.push('<tbody>')
    for (let row of exportData.rows) {
        let r = []
        for (let cell of row) {
            r.push('<td>' + lodashEscape(cell) + '</td>')
        }
        res.push('<tr>' + r.join('') + '</tr>')
    }
    res.push('</tbody>')
    res.push('</table>')
    return res.join('')
}
