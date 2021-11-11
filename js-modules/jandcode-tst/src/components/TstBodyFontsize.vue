<template>
    <div class="tst-body-fontsize">
        <span>body font-size:</span>
        <template v-for="sz in [0.75,1,1.25]">
            <button @click="fontSize=sz"
                    :class="{'tst-body-fontsize__current':fontSize===sz}">{{ sz }}
            </button>
        </template>
    </div>
</template>

<script>
import {jcBase} from '../vendor'

export default {
    name: "TstBodyFontsize",
    props: {},
    data() {
        return {
            fontSize: 1,
        }
    },
    watch: {
        fontSize: function(v) {
            document.body.style.fontSize = '' + this.fontSize + 'rem';
        },
    },
}
</script>

<style>
.tst-body-fontsize {
    display: flex;
    align-items: center;
}

.tst-body-fontsize .tst-body-fontsize__current {
    background-color: #dcdcdc;
    __color: white;
}
</style>