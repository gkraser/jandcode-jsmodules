import {apx} from '../vendor'
import {grabShowFrameOptions} from '../../utils/frame'

let {h, resolveComponent} = apx.Vue

function isAttrTrue(v) {
    return !(v == null || v === false);
}

/**
 * Какие виды кнопок существуют и их настройки
 */
export let config = {
    kind: {
        default: {},
        danger: {},
    },
}

/**
 * Обертка вокруг QBtn. Все ее свойства применимы.
 *
 * ### frame, frameProps, showFrame
 *
 * Если не определен `onClick` и указан атрибут `frame` или `showFrame`, то при клике делаем:
 *
 * ```
 * showFrame({
 *      frame:props.frame,
 *      props: attrs.frameProps,
 *      ...props.showFrame
 * })
 * ```
 *
 * ### kind: String
 *
 * Для обычной кнопки (не flat, outline, round) ставится класс `jc-btn--default`.
 * Если указан `kind`, то ставится дополнительно класс `jc-btn--${kind}`.
 *
 * ### size: String
 *
 * Если размер указан не числом (например не 12px, 15rem), то значение из атрибута `size`
 * рассматривается как класс `text-size-${size}`. Иначе - не трогается и им управляет quasar.
 *
 */
export default function JcBtn(props, context) {
    let QBtn = resolveComponent('q-btn')

    let attrs = apx.vueUtils.adaptProps(props)

    let cls = attrs.class

    cls.push('jc-btn')

    if (attrs['no-wrap'] == null) {
        attrs['no-wrap'] = true
    }
    if (attrs['no-caps'] == null) {
        attrs['no-caps'] = true
    }

    // размер задаем через классы
    if ('size' in attrs) {
        let sz = attrs['size']
        if (!apx.jcBase.isStartNumChar(sz)) {
            cls.push('text-size-' + sz)
            delete attrs['size']
        }
    }

    let kind = attrs.kind || 'default'

    //
    if (!isAttrTrue(attrs.flat) &&
        !isAttrTrue(attrs.outline) &&
        !isAttrTrue(attrs.round)) {
        // обычная кнопка
        cls.push('jc-btn--default')
        if (kind !== 'default') {
            cls.push('jc-btn--' + kind)
        }
    }

    // ссылку правим, если есть
    if (attrs.href) {
        attrs.href = apx.jcBase.url.ref(attrs.href)
    }

    // если тип явно не установлен, и нет click - ставим 'a'
    if (!attrs.type) {
        if (!attrs.onClick) {
            attrs.type = 'a'
        }
    }

    if (!attrs.onClick) {
        let sfp = grabShowFrameOptions(attrs)
        if (sfp) {
            attrs.onClick = (ev) => {
                apx.showFrame(sfp)
            }
        }
    }

    return h(QBtn, attrs, context.slots)
}

