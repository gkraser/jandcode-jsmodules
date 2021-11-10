import {apx} from '../vendor'

let {h, resolveComponent} = apx.Vue

export default {
    inject: {
        fullscreenOwner: {}
    },
    render() {
        let JcAction = resolveComponent('jc-action')

        let attrs = apx.vueUtils.adaptProps(this.$attrs)

        let owner = this.fullscreenOwner
        let status = owner.fullscreenStatus

        attrs.icon = status ? 'fullscreen-close' : 'fullscreen-open'
        attrs.tooltip = status ? 'Уменьшить' : 'Увеличить'
        attrs.onClick = () => {
            owner.toggleFullscreen()
        }

        return h(JcAction, attrs, this.$slots)
    }
}