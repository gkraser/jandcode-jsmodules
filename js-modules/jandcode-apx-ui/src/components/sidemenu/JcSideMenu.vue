<template>
    <q-list :class="classes" :bordered="bordered">
        <slot></slot>
    </q-list>
</template>

<script>
import {apx} from '../vendor';

let cn = 'jc-side-menu'

export default {
    name: cn,
    props: {
        bordered: {
            type: Boolean,
            default: false
        },

        accordion: {
            type: Boolean,
            default: true
        }
    },
    emits: {

        /**
         * click на каком-то элементе.
         * Элемент передается в качестве параметра.
         */
        click: null,

    },
    data() {
        return {
            group: apx.jcBase.nextId(cn)
        }
    },

    provide() {
        return {
            parentMenu: this
        }
    },

    computed: {

        classes() {
            return [
                cn
            ]
        },

    },

}
</script>
