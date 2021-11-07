<template>
    <div :class="classes">
        <slot name="default"/>
    </div>
</template>

<script>
export default {
    name: 'jc-toolbar',
    props: {

        /**
         * Плоская toolbar. На плоской все jc-action по умолчанию плоские.
         */
        flat: {
            type: Boolean, 
        }

    },
    provide() {
        return {
            parentToolbar: this,
        }
    },
    computed: {
        classes() {
            return ['row', 'items-center', 'jc-toolbar']
        }
    }
}
</script>
