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
            vueApp.component(comp.name, comp)
        }
    }
}
