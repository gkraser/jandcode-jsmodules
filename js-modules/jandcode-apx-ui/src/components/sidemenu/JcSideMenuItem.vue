<template>
    <q-item v-if="!hasItems"
            v-bind="$attrs"
            clickable
            :disable="disable"
            :style="style"
            :class="classes"
            @click="onClick"
            :href="href_calc"
            :target="target"
            :tag="tag_calc"
    >
        <q-item-section avatar>
            <q-icon :name="iconValue"/>
        </q-item-section>
        <q-item-section>
            {{ label }}
        </q-item-section>
    </q-item>
    <q-expansion-item v-else ref="expansionItem"
                      expand-separator1
                      :disable="disable"
                      :modelValue="opened"
                      :group="groupValue"
                      :headerStyle="style"
                      :headerClass="classes"
                      @click="onClick"
                      @update:modelValue="onChangeOpened">
        <template v-slot:header>
            <q-item-section avatar>
                <q-icon :name="iconValue"/>
            </q-item-section>
            <q-item-section>
                {{ label }}
            </q-item-section>
        </template>
        <q-list :class="classesList">
            <slot></slot>
        </q-list>
    </q-expansion-item>
</template>

<script>
import {apx} from '../vendor';
import {grabShowFrameOptions} from '../../utils/frame'

let nm = 'jc-side-menu-item'

export let cfg = {
    insetPaddingStart: 16,
    insetPaddingLevel: 32,
}

export default {
    name: 'JcSideMenuItem',
    props: {
        icon: {
            type: String,
            default: ''
        },

        label: {
            type: String
        },

        disable: {
            type: Boolean
        },

        opened: {
            type: Boolean,
            default: false
        },

        /**
         * Если указана - то показывает при клике делаем:
         * showFrame({frame:this.frame, props: frameProps, ...showFrame})
         */
        frame: {
            default: null,
        },

        frameProps: {
            default: null,
        },

        showFrame: {
            default: null,
        },

        href: {
            default: null,
        },

        target: {
            default: null,
        }
    },

    inject: {
        parentMenu: {default: null}
    },

    data() {
        return {
            group: apx.jcBase.nextId(nm),
        }
    },
    computed: {

        classes() {
            return [
                nm,
                nm + '--level-' + this.level
            ]
        },

        classesList() {
            return [
                nm + '--list-level-' + (this.level + 1)
            ]
        },

        style() {
            if (this.level > 0) {  //todo может в rem?
                let pad = (cfg.insetPaddingStart + this.level * cfg.insetPaddingLevel) + 'px'
                return {
                    'padding-left': pad
                }
            }
        },

        hasItems() {
            return !!this.$slots.default
        },

        groupValue() {
            if (this.parentMenu) {
                if (!this.parentMenu.accordion) {
                    return
                }
            }

            let parentItem = apx.vueUtils.findCompUp(this.$parent, this.$options.name)
            if (parentItem) {
                return parentItem.group
            }

            if (this.parentMenu) {
                return this.parentMenu.group
            }

        },

        iconValue() {
            // если нет иконки, возвращаем пустую
            return this.icon || ' '
        },

        /**
         * Уровень, начиня с 0
         */
        level() {
            let own = apx.vueUtils.findCompUp(this.$parent, this.$options.name)
            if (own) {
                return own.level + 1
            } else {
                return 0
            }
        },

        href_calc() {
            if (this.href == null) {
                return void 0
            }
            return apx.jcBase.url.ref(this.href)
        },

        tag_calc() {
            if (this.href == null) {
                return 'div'
            }
            return 'a'
        }

    },
    methods: {
        onClick(ev) {
            let sfp = grabShowFrameOptions(this)
            if (sfp) {
                apx.showFrame(sfp)
            } else {
                this.$emit('click', ev, this)
            }
        },
        onChangeOpened(val) {
            let oldVal = this.$refs.expansionItem.showing
            if (this.$listeners.input) {
                this.$emit('input', val)
            } else {
                this.$refs.expansionItem.showing = val
            }
            if (this.parentMenu && oldVal !== val) {
                this.parentMenu.$emit('opened-change', this)
            }
        },
    }
}
</script>
