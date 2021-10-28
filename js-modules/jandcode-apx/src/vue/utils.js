/* Утилиты для vue
----------------------------------------------------------------------------- */

import {jcBase} from '../vendor'

/**
 * Регистрация компонентов
 * @param vueApp для какого приложения vue
 * @param comps набор компонентов. Каждый компонент, имеющий name будет зарегистрирован
 */
export function registerVueComponents(vueApp, comps) {
    if (!comps) {
        return
    }
    for (let key in comps) {
        let comp = comps[key];
        if (comp.name) {
            registerVueComponent(vueApp, comp.name, comp)
        }
    }
}

/**
 * Регистрация компонента
 * @param vueApp для какого приложения vue
 * @param name имя компонента
 * @param comp компонент
 */
export function registerVueComponent(vueApp, name, comp) {
    if (!comp || !name) {
        return
    }
    vueApp._context.components[name] = comp
}

/**
 * Адаптировать props функционального компонента для модификации
 * @param props свойства функционального компонента
 * @return {*} копия свойств, адаптированная для модификации
 */
export function adaptProps(props) {
    let res = Object.assign({}, props)
    if (jcBase.isArray(res.class)) {
        res.class = [...res.class]
    }
    if (res.class == null) {
        res.class = []
    } else {
        res.class = [res.class]
    }
    return res
}

/**
 * Проверка, что компонент является определенным компонентом
 * @param comp экземпляр компонента
 * @param type тип. Может быть строкой, тогда проверяется имя компонента.
 *        Может быть функцией вида fn(comp). Если функция возвращает
 *        true, значит наш компонент.
 */
export function isComp(comp, type) {
    if (!comp) {
        return false;
    }
    if (comp.$options) {
        // это экземпляр компонента
        if (jcBase.isFunction(type)) {
            return type(comp);
        } else {
            return comp.$options.name === type
        }
    }

    return false;
}


/**
 * Ищет компонент с указанным типом, которому принадлежит компонент from.
 * Возвращает найденный компонент или null, если не найден.
 * @param from с какого компонента искать
 * @param type тип искомого компонента (включая его самого).
 * @see isComp
 */
export function findCompUp(from, type) {
    if (!from) return null;
    if (isComp(from, type)) return from;
    return findCompUp(from.$parent, type)
}
