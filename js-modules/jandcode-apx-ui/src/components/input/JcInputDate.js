import {apx} from '../vendor'
import {adaptInput} from './utils'

let {h, resolveComponent} = apx.Vue

let nm = 'jc-input-password'

let displayFormat = apx.jcBase.cfg.date.displayFormat

export default {
    name: nm,

    data() {
        return {
            inpValue: null,
            showPopup: false,
        }
    },

    render() {
        let BaseComp = resolveComponent('q-input')
        let QIcon = resolveComponent('q-icon')
        let QMenu = resolveComponent('q-menu')
        let QDate = resolveComponent('q-date')

        let attrs = adaptInput(this)

        attrs.class.push(nm)


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

        return h(BaseComp, attrs, {
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
