import {apx} from '../vendor'
import {adaptInput} from './utils'

let {h, resolveComponent} = apx.Vue

let nm = 'jc-input-password'

export default {
    name: nm,
    inheritAttrs: false, // это обязательно для полного перекрытия attrs
    render() {
        let QInput = resolveComponent('q-input')
        let attrs = adaptInput(this)

        attrs.type = 'password'

        return h(QInput, attrs)
    }
}
