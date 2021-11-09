import {apx} from '../vendor'
import Chance from 'chance'

/**
 * Утилиты для генерации данных
 */
export class RndUtils {

    constructor(seed) {
        // генератор случайностей
        let seedUse = seed !== void 0 ? seed : 12331
        this.rnd = new Chance(seedUse)
    }

    /**
     * Дату в строку ISO
     * @param dt
     * @return {string}
     */
    dateToStr(dt) {
        return apx.date.toStr(dt)
    }

    /**
     * Возвращает массив дат длинной days-дней.
     * Даты в формате 'YYYY-MM-DD' (число msec).
     * Последняя дата в списке - 'сегодня'.
     * Первая - 'сегодня - days'
     * @param days количество дней
     */
    days(days) {
        if (days < 1) {
            days = 1
        }
        let startDate = apx.date.subDays(apx.date.today(), days)
        let res = []
        for (let i = 0; i < days; i++) {
            let dt = this.dateToStr(apx.date.addDays(startDate, i))
            res.push(dt)
        }
        return res
    }

}
