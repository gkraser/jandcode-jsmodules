/* Утилиты для vue
----------------------------------------------------------------------------- */

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

