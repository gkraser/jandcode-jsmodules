/**
 * Обертка для vue-компонента, которую возвращает функция
 * cell.vue в onRenderCell
 */
export class VueComponentWrapper {
    constructor(component, props) {
        this.component = component
        this.props = props
    }
}

/**
 * Реализация функции cell.vue в onRenderCell
 */
export function createVueComponentWrapper(component, props) {
    return new VueComponentWrapper(component, props)
}
