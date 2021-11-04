<template>
    <tst-panel>
        <div class="q-gutter-x-md">
            <jc-btn label="showMsg()" @click="showMsg1"/>
            <jc-btn label="showYn()" @click="showYn1"/>
            <jc-btn label="showError()" @click="showError1"/>
        </div>
    </tst-panel>
</template>

<script>
import {apx} from '../vendor'

export default {
    methods: {
        showMsg1() {
            apx.showMsg('Текст сообщения')
        },
        showYn1() {
            apx.showYn('Подтверждаете это самое?', () => {
                console.info("choice yes");
                apx.showMsg('Вы нажали да')
            })
        },
        showError1() {
            apx.showError('Текст ошибки')
        },
    }
}
</script>
