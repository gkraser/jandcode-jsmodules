<template>
    <div :class="classes">
        <q-breadcrumbs v-show="showOne || items.length>1">
            <template v-for="it in items">
                <q-breadcrumbs-el :label="it.title"
                                  :class="{'jc-breadcrumbs-frames--link':!it.last}"
                                  @click="clickItem(it)"/>
            </template>
        </q-breadcrumbs>
    </div>
</template>

<script>

let nm = 'jc-breadcrumbs-frames'

/**
 * Компонент для отображения текущего списка фреймов из shower
 */
export default {
    name: nm,
    props: {
        showOne: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            items: [],
        }
    },
    computed: {
        classes() {
            let res = [nm]
            if (!(this.showOne || this.items.length > 1)) {
                res.push(nm + '--hidden')
            }
            return res
        }
    },
    methods: {

        /**
         * Этот метод нужно вызвать, когда состав фреймов обновится
         * @param shower для какого shower
         */
        updateFrames(shower) {
            let lst = []
            this.frames = shower.getFrames()
            let index = 0
            for (let fw of this.frames) {
                let item = {
                    title: fw.getTitleShort(),
                    id: fw.id,
                    last: index === this.frames.length - 1,
                    index: index,
                    fw: fw,
                }
                index++
                lst.push(item)
            }
            this.items = lst
        },

        clickItem(item) {
            if (item.last) {
                return
            }
            item.fw.shower.activateFrameWrapper(item.fw)
        }
    },
}
</script>
