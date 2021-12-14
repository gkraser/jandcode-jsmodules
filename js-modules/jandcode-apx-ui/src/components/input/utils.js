import {apx} from '../vendor'

let {h, resolveComponent} = apx.Vue

/**
 * Адаптировать input к общим правилам
 *
 * Дополнительные атрибуты:
 * - width: css-ширина внутреннего input, например можно задавать размер в символах '20ch'
 *
 * @param th экземпляр компонента (this из render)
 * @return {*}
 */
export function adaptInput(th) {
    let attrs = apx.vueUtils.adaptProps(th.$attrs)

    if (attrs.outlined == null) {
        attrs.outlined = true
    }
    if (attrs.stackLabel == null) {
        attrs.stackLabel = true
    }
    if (attrs.clearIcon == null) {
        attrs.clearIcon = 'clear'
    }
    if (attrs.noErrorIcon == null) {
        attrs.noErrorIcon = true
    }
    if (attrs.hideBottomSpace == null) {
        attrs.hideBottomSpace = true
    }
    if (attrs.lazyRules == null) {
        attrs.lazyRules = true
    }

    attrs.class.push('jc-input')

    if (attrs.width != null) {
        let width = attrs.width
        delete attrs.width
        apx.vueUtils.adaptPropSC(attrs, 'inputStyle')
        attrs.inputStyle.push({width: width})
    }

    return attrs
}
