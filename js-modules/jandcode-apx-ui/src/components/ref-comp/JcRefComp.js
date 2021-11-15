import {apx} from '../vendor'

/**
 * Компонент для получения ссылки на дочерний компонент.
 * У него есть слот по умолчанию. Первый компонент в этом слоте будет доступен
 * через метод getRefComp().
 *
 * Компонент в первую очередь предназначен для панелей, которые оборачивают единственный
 * компонент и расчитывают на определенный обернутый компонент. Например jc-chart-panel
 * или jc-datagrid-panel.
 */
export default {
    name: 'jc-ref-comp',

    render() {
        let slotDefault = this.$slots.default
        if (!apx.jcBase.isFunction(slotDefault)) {
            return 'no slot default'
        }
        let nodes = slotDefault()

        // ищем первый дочерний не символ, в глубину
        let step = (nodes) => {
            for (let z of nodes) {
                if (typeof z.type === 'symbol') {
                    if (z.children) {
                        return step(z.children)
                    }
                    continue
                }
                return z
            }
            return null
        }

        this.__refComp = step(nodes)

        return nodes
    },

    beforeUnmount() {
        if (this.__refComp) {
            this.__refComp = null
        }
    },

    methods: {
        getRefComp() {
            if (this.__refComp && this.__refComp.component) {
                return this.__refComp.component.ctx
            } else {
                return null
            }
        }
    }

}