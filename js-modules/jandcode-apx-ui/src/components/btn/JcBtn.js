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
        primary: {},
        danger: {},
    },
}

/**
 * Обертка вокруг QBtn. Все ее свойства применимы.
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
export default {
    name: 'jc-btn',
    render() {
        let QBtn = resolveComponent('q-btn')
        let attrs = apx.vueUtils.adaptProps(this.$attrs)

        let cls = attrs.class

        cls.push('jc-btn')

        if (attrs['no-wrap'] == null) {
            attrs['no-wrap'] = true
        }
        if (attrs['no-caps'] == null) {
            attrs['no-caps'] = true
        }
        if (attrs['outline'] == null) {
            attrs['outline'] = true
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
            !isAttrTrue(attrs.round)) {
            // обычная кнопка
            cls.push('jc-btn--default')
            if (kind !== 'default') {
                cls.push('jc-btn--' + kind)
            }
        }

        //
        if (attrs.icon && !attrs.label) {
            cls.push('jc-btn--icon-only')
        }

        // ссылку правим, если есть
        if (attrs.href) {
            attrs.href = apx.jcBase.url.ref(attrs.href)
        }

        // если тип явно не установлен, ставим 'a' (для button при disable не работают tooltip!)
        if (!attrs.type) {
            attrs.type = 'a'
        }

        return h(QBtn, attrs, this.$slots)
    }
}

