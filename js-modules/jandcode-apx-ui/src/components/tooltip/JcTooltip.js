import {apx} from '../vendor'

let {h, resolveComponent} = apx.Vue

/**
 * Настройки по умолчанию
 */
export let config = {
    delay: 500,
}

export default {
    name: 'jc-tooltip',

    render() {
        let QTooltip = resolveComponent('q-tooltip')
        let attrs = apx.vueUtils.adaptProps(this.$attrs)

        let cls = attrs.class

        cls.push('jc-tooltip')

        if (attrs['delay'] == null) {
            attrs['delay'] = config.delay
        }

        //
        return h(QTooltip, attrs, this.$slots)
    }

}