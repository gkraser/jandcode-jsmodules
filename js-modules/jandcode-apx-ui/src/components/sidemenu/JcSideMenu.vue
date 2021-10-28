<template>
    <q-list :class="classes" :bordered="bordered">
        <slot></slot>
    </q-list>
</template>

<script>
import {apx} from '../vendor';

let cn = 'jc-side-menu'

/*

doc:

event:opened-change
    Изменилось opened у какого-то  дочернего

 */

export default {
    name: 'JcSideMenu',
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
