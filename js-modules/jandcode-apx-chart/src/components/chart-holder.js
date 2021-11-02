/* Хранилище всех jc-chart, которые работают сейчас.
----------------------------------------------------------------------------- */

let _chartHolder = new Set()

export function registerChart(jcChart) {
    if (!jcChart) {
        return
    }
    _chartHolder.add(jcChart)
}

export function unregisterChart(jcChart) {
    if (!jcChart) {
        return
    }
    _chartHolder.delete(jcChart)
}

export function getAllRregistredChart() {
    return Array.from(_chartHolder)
}

/**
 * Скрыть все tooltip
 */
export function hideAllTooltip() {
    for (let ch of _chartHolder) {
        let chartInst = ch.chartInst
        if (!chartInst) {
            continue
        }
        chartInst.dispatchAction({
            type: 'hideTip',
        })
    }
}
