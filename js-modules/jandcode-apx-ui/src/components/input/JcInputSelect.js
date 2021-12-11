import {apx} from '../vendor'
import {adaptInput} from './utils'

let {h, resolveComponent} = apx.Vue

let nm = 'jc-input-select'

export default {
    name: nm,
    inheritAttrs: false, // это обязательно для полного перекрытия attrs
    render() {
        let QSelect = resolveComponent('q-select')
        let attrs = adaptInput(this)

        attrs.transitionShow = null
        attrs.transitionHide = null
        attrs.emitValue = true
        //attrs.optionsDense = true

        return h(QSelect, attrs, this.$slots)
    }
}
