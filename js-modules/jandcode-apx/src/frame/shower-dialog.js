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
            throw new Error("replace not supported in dialogs")
        }
        let th = this
        let dialog_vueApp = createVueApp(Dialog, {
            frameWrapper: fw,
            onDialogClose() {
                let a = th._frames.indexOf(fw)
                if (a !== -1) {
                    th._frames.splice(a, 1)
                }
                dialog_vueApp.unmount()
                dialog_vueMountEl.remove()
                fw.__dialog_vueInst = null
                fw.destroy()
            }
        })
        let dialog_vueMountEl = jcBase.dom.createTmpElement()
        let dialog_vueInst = fw.__dialog_vueInst = dialog_vueApp.mount(dialog_vueMountEl)
        dialog_vueInst.showDialog()
        this._frames.push(fw)
    }


    async closeFrameWrapper(fw, cmd) {
        let a = this._frames.indexOf(fw)
        if (a === -1) {
            return // не наш фрейм
        }
        if (await this.checkClose(fw, cmd)) {
            fw.__dialog_vueInst.hideDialog()
        }
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
        // framePlaceEl.parentNode еще не существует, поэтому - nextTick
        this.$nextTick(() => {
            let framePlaceEl = this.$refs['framePlace']
            let frameBodyEl = this.frameWrapper.vueInst.$el
            framePlaceEl.parentNode.insertBefore(frameBodyEl, framePlaceEl)
        })
    },
    beforeUnmount() {
        // возвращаем el фрейма туда, откуда взяли
        this.frameWrapper.vueMountEl.appendChild(this.frameWrapper.vueInst.$el)
    },
    methods: {
        showDialog() {
            this.$refs.dialogInst.show()
            this.frameWrapper.eventBus.emit('show', this.frameWrapper)
        },

        hideDialog() {
            this.frameWrapper.eventBus.emit('hide', this.frameWrapper)
            this.$refs.dialogInst.hide()
        },
    }
}
