import {apx} from '../vendor'
import {adaptInput} from './utils'

let {h, resolveComponent} = apx.Vue

let nm = 'jc-input-text'

export default {
    name: nm,
    render() {
        let BaseComp = resolveComponent('q-input')
        let attrs = adaptInput(this)

        attrs.class.push(nm)

        return h(BaseComp, attrs)
    }
}
