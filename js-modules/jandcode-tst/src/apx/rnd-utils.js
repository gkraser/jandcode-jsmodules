import {apx} from '../vendor'
import Chance from 'chance'

/**
 * Утилиты для генерации данных
 */
export class RndUtils {

    constructor() {
        // генератор случайностей
        this.rnd = new Chance(12331)
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
     * Даты в формате timestamp (число msec).
     * Последняя дата в списке - 'сегодня'.
     * Первая - 'сегодня - days'
     * @param days количество дней
     */
    days(days) {
        if (days < 1) {
            days = 1
        }
        let startDate = apx.date.subDays(date.today(), days)
        let res = []
        for (let i = 0; i < days; i++) {
            let dt = this.dateToStr(apx.date.addDays(startDate, i))
            res.push(dt)
        }
        return res
    }

}
