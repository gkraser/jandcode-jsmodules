import {apx} from '../vendor'

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
 * Если указан атрибут 'frame' и click не определен, то при клике делаем:
 * showFrame({frame:attrs.frame, params: attrs.frameParams, ...attrs.showFrameParams})
 */
export default function JcBtn(props, context) {
    let QBtn = resolveComponent('q-btn')

    let attrs = apx.vueUtils.adaptProps(props)

    let cls = attrs.class

    cls.push('jc-btn')

    if (attrs['no-wrap'] == null) {
        attrs['no-wrap'] = true
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
        if (attrs.frame || attrs.showFrame) {
            attrs.onClick = (ev) => {
                let sfp = Object.assign({}, attrs.showFrame)
                if (attrs.frame) {
                    sfp.frame = attrs.frame
                }
                if (attrs.frameProps) {
                    sfp.props = attrs.frameProps
                }
                if (attrs.showFrame) {
                    Object.assign(sfp, attrs.showFrame)
                }
                apx.showFrame(sfp)
            }
        }
    }

    return h(QBtn, attrs, context.slots)
}

