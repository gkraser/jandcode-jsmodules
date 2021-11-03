import {apx} from '../vendor'

let {h, resolveComponent} = apx.Vue

let nm = 'jc-input-text'

export default {
    name: nm,
    render() {
        let BaseComp = resolveComponent('q-input')
        let attrs = apx.vueUtils.adaptProps(this.$attrs)

        if (attrs.outlined == null) {
            attrs.outlined = true
        }

        attrs.class.push('jc-input', nm)

        return h(BaseComp, attrs)
    }
}
