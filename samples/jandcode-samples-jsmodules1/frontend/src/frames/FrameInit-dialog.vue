<template>
    <decor-dialog>
        <div class="q-gutter-md">
            <div>users: {{ users }}</div>
            <div>dummyList: {{ frameData.dummyList }}</div>
        </div>
    </decor-dialog>
</template>

<script>
import FrameInit from './FrameInit'

export default {
    // наследуем существующий фрейм
    extends: FrameInit,

    // frameInit не наследуется!
    async frameInit(fw) {
        // вызываем унаследованный
        await FrameInit.frameInit(fw)
    }
}
</script>
