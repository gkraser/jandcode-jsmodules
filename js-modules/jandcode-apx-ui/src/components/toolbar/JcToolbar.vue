<template>
    <div :class="classes">
        <slot name="default"/>
    </div>
</template>

<script>
export default {
    name: 'jc-toolbar',
    provide() {
        return {
            inToolbar: true
        }
    },
    computed: {
        classes() {
            return ['row', 'items-center', 'jc-toolbar']
        }
    }
}
</script>
