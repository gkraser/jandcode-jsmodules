import {apx} from '../vendor'
import {adaptInput} from './utils'

let {h, resolveComponent} = apx.Vue

let nm = 'jc-input-date'

let displayFormat = apx.jcBase.cfg.date.displayFormat

export default {
    name: nm,
    inheritAttrs: false, // это обязательно для полного перекрытия attrs
    props: {
        //modelValue: {}
    },
    created() {
        //this.inpValue = apx.date.format(this.modelValue, displayFormat)
    },

    data() {
        return {
            inpValue: '12',
            showPopup: false,
        }
    },

    render() {
        let QInput = resolveComponent('q-input')
        let QIcon = resolveComponent('q-icon')
        let QMenu = resolveComponent('q-menu')
        let QDate = resolveComponent('q-date')

        let attrs = adaptInput(this)

        attrs.class.push(nm)

        // model
        attrs.modelValue = this.inpValue
        attrs['onUpdate:modelValue'] = value => this.inpValue = value

        // popup
        let nDate = h(QDate, {
            yearsInMonthView: true,
            todayBtn: true,
            modelValue: this.inpValue,
            'onUpdate:modelValue': value => this.inpValue = value
        })
        let nMenu = h(QMenu, {
            transitionShow: null,
            transitionHide: null,
            anchor: "bottom left",
            self: "top left",
            noParentEvent: true,
            modelValue: this.showPopup,
            'onUpdate:modelValue': value => this.showPopup = value
        }, {default: () => [nDate]})

        return h(QInput, attrs, {
            default: () => [nMenu],
            append: () => [h(QIcon, {
                name: 'calendar',
                class: 'cursor-pointer',
                onClick: () => {
                    this.showPopup = true
                }
            })]
        })
    }
}
