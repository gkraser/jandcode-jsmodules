<template>
    <div class="kis-xdash-dash1 dash1">
        Dash1 prop1={{ prop1 }}

        <div class="kis-xdash-dash1__head" :class="{'kis-xdash-dash1__head--big':big}">
            part1
        </div>

        <div class="kis-xdash-dash1__body bg-positive-200 text-negative-900">part2</div>

        <jc-btn label="b1"/>

    </div>
</template>

<script>
export default {
    props: {
        prop1: {},
        big: {type: Boolean}
    },
    data() {
        return {}
    },
    methods: {},
}
</script>

<style lang="less">
@import (reference) "~@jandcode/apx-ui/src/css/apx-base/vars";

@kis-xdash-dash1-size1: 2em;

:root {
    --v-v1: @kis-xdash-dash1-size1;
}

.kis-xdash-dash1 {

    border: 1px solid green;

    &__head {
        font-size: @kis-xdash-dash1-size1;
    }

    &__head--big {
        font-size: @kis-xdash-dash1-size1 * 3;
    }

    & .jc-btn {
        font-size: @font-size-large-7;
    }


}

//.kis-xdash-dash1__head {
//    font-size: 2em;
//}
//
//.kis-xdash-dash1__head--big {
//    font-size: 4em;
//}
</style>