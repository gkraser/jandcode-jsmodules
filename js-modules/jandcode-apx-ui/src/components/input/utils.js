import {apx} from '../vendor'

let {h, resolveComponent} = apx.Vue

/**
 * Адаптировать input к общим правилам
 * @param th
 * @return {*}
 */
export function adaptInput(th) {
    let attrs = apx.vueUtils.adaptProps(th.$attrs)

    if (attrs.outlined == null) {
        attrs.outlined = true
    }

    attrs.class.push('jc-input')

    return attrs
}
