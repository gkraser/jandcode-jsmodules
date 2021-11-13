import {apx} from '../vendor'
import Chance from 'chance'
import female_first_name from 'faker/lib/locales/ru/name/female_first_name'
import female_last_name from 'faker/lib/locales/ru/name/female_last_name'
import male_first_name from 'faker/lib/locales/ru/name/male_first_name'
import male_last_name from 'faker/lib/locales/ru/name/male_last_name'

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

    /**
     * Имя и фамилия
     * @param lang язык (ru, en), если не указан - выбирается случайно
     * @return {string}
     */
    firstLastName(lang) {
        let rnd = this.rnd
        if (!lang) {
            lang = rnd.pickone(['ru', 'en'])
        }
        if (lang === 'ru') {
            let m = rnd.pickone(['male', 'female'])
            if (m === 'male') {
                return rnd.pickone(male_first_name) + ' ' + rnd.pickone(male_last_name)
            } else {
                return rnd.pickone(female_first_name) + ' ' + rnd.pickone(female_last_name)
            }
        } else {
            return rnd.first() + ' ' + rnd.last()
        }
    }
}
