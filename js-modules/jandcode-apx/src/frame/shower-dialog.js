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
        if (fw.options.replace) {
            throw new Error("replace (and reloadFrame) not supported in dialogs")
        }
        let dialog_vueApp = createVueApp(Dialog, {
            frameWrapper: fw,
            onDialogClose() {
                console.info("close dialog!");
            }
        })
        let dialog_vueMountEl = jcBase.dom.createTmpElement()
        let dialog_vueInst = dialog_vueApp.mount(dialog_vueMountEl)
        dialog_vueInst.showDialog()
    }

}

/**
 * Диалог.
 * Это обертка вокруг q-dialog
 */
export let Dialog = {
    props: {
        frameWrapper: Object
    },
    render() {
        let qDialog = resolveComponent('q-dialog')
        return h(qDialog, {
            ref: 'dialogInst',
            class: 'jc-dialog',
            transitionShow: null,
            transitionHide: null,
            noBackdropDismiss: true,
            onHide: () => {
                this.$emit('dialog-close', this)
            }
        }, {
            default: (props) => h('div', {ref: 'framePlace', style: 'display:none;'})
        })
    },
    mounted() {
        this.$nextTick(() => {
            let framePlaceEl = this.$refs['framePlace']
            let frameBodyEl = this.frameWrapper.vueInst.$el
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
    }
}
