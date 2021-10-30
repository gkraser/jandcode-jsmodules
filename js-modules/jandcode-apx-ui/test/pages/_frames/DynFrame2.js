import Frame1 from './Frame1'

export default {
    extends: Frame1,
    created() {
        this.title = 'Dyn' + this.title
    },
    async frameInit(fw) {
        await Frame1.frameInit(fw)
        fw.frameData.dynData1 =  'dyn1'
    }
}