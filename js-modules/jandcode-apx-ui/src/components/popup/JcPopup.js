import {apx} from '../vendor'

let {h, resolveComponent} = apx.Vue

export default {
    name: 'jc-popup',

    render() {
        let QMenu = resolveComponent('q-menu')
        let attrs = apx.vueUtils.adaptProps(this.$attrs)

        let cls = attrs.class

        cls.push('jc-popup')

        if (!('transitionShow' in attrs)) {
            attrs.transitionShow = null
        }
        if (!('transitionHide' in attrs)) {
            attrs.transitionHide = null
        }

        //
        return h(QMenu, attrs, this.$slots)
    }

}