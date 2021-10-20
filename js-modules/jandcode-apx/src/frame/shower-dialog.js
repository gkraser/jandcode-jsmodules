import {Vue, jcBase} from '../vendor'
import {FrameShower} from './shower'
import {createVueApp} from '../vue'

const {h, resolveComponent} = Vue

/**
 * Показ фрейма как диалога
 */
export class FrameShower_dialog extends FrameShower {

    constructor() {
        super()
    }

    async showFrameWrapper(fw) {
        let dialog_vueApp = createVueApp(Dialog, {frameWrapper: fw})
        let dialog_vueMountEl = jcBase.dom.createTmpElement()
        let dialog_vueInst = dialog_vueApp.mount(dialog_vueMountEl)
        dialog_vueInst.showDialog()
    }

}

// Место для фрейма в диалоге
// let DialogFramePlace = {
//     props: {
//         own: Object,
//     },
//
//     render() {
//         return h('div', {style: {display: 'none'}})
//     },
//
//     mounted() {  //todo
//         // монтируем фрейм вместо себя
//         this.$el.parentNode.appendChild(this.own.frameInst.$el)
//         this.$el.parentNode.removeChild(this.$el)
//     },
// }

/**
 * Диалог.
 * Это обертка вокруг q-dialog
 */
export let Dialog = {
    // components: {
    //     DialogFramePlace
    // },
    props: {
        frameWrapper: Object
    },
    data() {
        return {}
    },
    render() {
        let qDialog = resolveComponent('q-dialog')
        return h(qDialog, {
            ref: 'dialogInst',
            class: 'jc-dialog',
            transitionShow: null,
            transitionHide: null,
            noBackdropDismiss: true,
        }, {
            default: (props) => h('div', {ref: 'framePlace', style: 'display:none;'})
        })
    },
    mounted() {
        this.$nextTick(()=>{
            console.info("dialog refs",this.$refs);
            let framePlaceEl = this.$refs['framePlace']
            let frameBodyEl = this.frameWrapper.vueInst.$el
            console.info("framePlaceEl",framePlaceEl);
            console.info("frameBodyEl",frameBodyEl);
            framePlaceEl.parentNode.insertBefore(frameBodyEl, framePlaceEl)
        })
    },
    methods: {
        showDialog() {
            this.$refs.dialogInst.show()
        },

        hideDialog() {
            this.$refs.dialogInst.hide()
        },

        onHideDialog() {
            this.$emit('dialog-close', this)
        }
    }
}

