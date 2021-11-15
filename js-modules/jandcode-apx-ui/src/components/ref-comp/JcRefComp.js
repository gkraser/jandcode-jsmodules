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
        let node = nodes[0]
        let refComp
        for (let z of node.children) {
            if (typeof z.type === 'symbol') {
                continue
            }
            if (refComp == null) {
                refComp = z
            } else {
                console.warn("Only the first child will be shown, this will be ignored:", z);
            }
        }
        this.__refComp = refComp

        return nodes
    },

    beforeUnmount() {
        if (this.__refComp) {
            this.__refComp = null
        }
    },

    methods: {
        getRefComp() {
            return this.__refComp.component.ctx
        }
    }

}