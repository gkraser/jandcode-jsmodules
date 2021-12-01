/*

Построитель меню по объекту js.

----------------------------------------------------------------------------- */

import {apx} from '../vendor'

let {h, resolveComponent} = apx.Vue

export default {
    name: 'jc-menu-builder',

    props: {

        /**
         * Список элементов.
         */
        items: {
            type: Array
        },

        /**
         * Имя свойства с меткой меню
         */
        labelProp: {
            default: 'label'
        },

        /**
         * Компонент для пунктов меню.
         */
        itemComp: {
            default: 'jc-side-menu-item'
        },

        /**
         * Иконка по умолчанию, если для пунктя явно не установлена.
         * По умолчанию - null (не ставить иконку по умолчанию)
         */
        iconDefault: {
            default: null,
        }
    },

    render() {
        let {
            items,
            labelProp,
            iconDefault
        } = this

        let itemComp = resolveComponent(this.itemComp)
        let separatorComp = resolveComponent('q-separator')

        function step(item) {
            let childs = []

            if (item.separator) {
                return h(separatorComp)
            }

            let folder = item.items && apx.jcBase.isArray(item.items)
            if (folder) {
                for (let child of item.items) {
                    childs.push(step(child))
                }
            }

            let props = Object.assign({}, item)

            props.label = item[labelProp] || item.label

            if (!props.icon) {
                if (iconDefault) {
                    props.icon = iconDefault
                }
            }
            if (props.href) {
                props.href = apx.jcBase.url.ref(item.href)
            }

            if (folder) {
                props.opened = !!item.opened
            }

            if (!props.onClick) {
                if (props.showFrame) {
                    props.onClick = () => {
                        apx.showFrame(props.showFrame)
                    }
                }
            }

            let ch = null
            if (childs.length > 0) {
                ch = {
                    default: () => childs
                }
            }

            return h(itemComp, props, ch)
        }

        let res = []
        if (apx.jcBase.isArray(items)) {
            for (let child of items) {
                res.push(step(child))
            }
        }
        return res
    }
}

