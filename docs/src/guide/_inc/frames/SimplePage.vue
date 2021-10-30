<template>
    <decor-page>
        <template #toolbar>
            <jc-action icon="mail"/>
            <jc-action icon="calendar"/>
        </template>
        Страница
    </decor-page>
</template>

<script>
import {apx} from './vendor'
export default {
    extends: apx.JcFrame,
    created() {
        this.title = 'Простая страница'
        this.title2 = 'Есть мелкий заголовок'
        this.icon = 'frame'
    },
}
</script>