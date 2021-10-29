<template>
    <div class="tst-error-app">
        <div class="tst-error-app__message">
            <div>Error:</div>
            <div>{{ message }}</div>
        </div>
        <div><a href="?">return</a></div>
    </div>
</template>

<script>
import {apx} from '../vendor'

export default {
    props: {
        error: null,
    },
    data() {
        return {}
    },
    computed: {
        message() {
            let ei = apx.jcBase.createError(this.error)
            return ei.message
        }
    },
    methods: {},
}
</script>

<style lang="less">
.tst-error-app {
    font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;

    padding: 40px;

    &__message {
        padding: 40px;
        background-color: #ffdbdb;
        border: 1px solid red;
        color: red;
    }
}
</style>
