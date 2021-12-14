/* Утилиты для vue
----------------------------------------------------------------------------- */

import {jcBase, Vue} from '../vendor'

let {mergeProps, createVNode, render} = Vue

/**
 * Регистрация компонентов
 * @param vueApp для какого приложения vue
 * @param comps набор компонентов. Ключ - имя компонента, значение - компонент
 */
export function registerVueComponents(vueApp, comps) {
    if (!comps) {
        return
    }
    for (let key in comps) {
        let comp = comps[key];
        registerVueComponent(vueApp, key, comp)
    }
}

/**
 * Регистрация компонента
 * @param vueApp для какого приложения vue
 * @param name имя компонента. Приводится к PascalCase
 * @param comp компонент
 */
export function registerVueComponent(vueApp, name, comp) {
    if (!comp || !name) {
        return
    }
    name = normalizeCompName(name)
    vueApp._context.components[name] = comp
}

/**
 * Адаптировать свойство по правилам style/class
 * @param obj в каком объекте
 * @param propName имя свойства
 */
export function adaptPropSC(obj, propName) {
    let v = obj[propName]
    if (jcBase.isArray(v)) {
        obj[propName] = [...v]
    } else if (v == null) {
        obj[propName] = []
    } else {
        obj[propName] = [v]
    }
    return obj
}

/**
 * Адаптировать props функционального компонента для модификации
 * @param props свойства функционального компонента
 * @return {*} копия свойств, адаптированная для модификации
 */
export function adaptProps(...props) {
    let res = mergeProps(...props)
    //
    adaptPropSC(res, 'class')
    adaptPropSC(res, 'style')
    //
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

const camelizeRE = /-(\w)/g;

/**
 * kebab-case to camelCase
 */
export function camelize(str) {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * first char to upper
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Нормализация имени компонента (kebab-case to PascalCase)
 */
export function normalizeCompName(str) {
    return capitalize(camelize(str))
}


/**
 * Для компонента comp возвращает его app
 * @param comp компонент или app
 * @return {Object} null, если не удалось определить приложение
 */
export function resolveApp(comp) {
    if (!comp) {
        return null
    }
    if (comp._context) {
        return comp
    }
    if (comp.$root) {
        if (comp.$root.$) {
            if (comp.$root.$.appContext) {
                if (comp.$root.$.appContext.app) {
                    if (comp.$root.$.appContext.app._context) {
                        return comp.$root.$.appContext.app
                    }
                }
            }
        }
    }
    return null
}

/**
 * Монтирование vue-компонента на лету
 * @param options.component какой компонент
 * @param options.props свойства компонента
 * @param options.el куда монтировать
 * @param options.app приложение, в контексте которого монтировать. Можно указать экземпляр vue,
 * тогда приложение вычислится автоматически по нему
 * @return {{el: HTMLElement, destroy: destroy, vNode: *}}
 */
export function mountComponent(options) {
    let {component, props, el, app} = options
    let vNode = createVNode(component, props)

    app = resolveApp(app)
    if (app) {
        vNode.appContext = app._context
    }

    if (!el) {
        el = document.createElement('div')
    }

    render(vNode, el)

    let destroy = () => {
        if (el) {
            render(null, el)
        }
        el = null
        vNode = null
    }

    return {vNode, destroy, el}
}
