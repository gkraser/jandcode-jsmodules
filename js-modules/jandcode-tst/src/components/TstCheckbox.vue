<template>
    <label class="tst-checkbox">
        <input type="checkbox" :checked="modelValue" @change="onChange">
        <span>{{ label }}</span>
    </label>
</template>

<script>
export default {
    name: 'tst-checkbox',
    props: {
        label: {
            type: String,
        },
        modelValue: null
    },
    methods: {
        onChange: function(ev) {
            this.$emit('update:modelValue', ev.target.checked);
        }
    }
}
</script>

<style>
.tst-checkbox {
    display: flex;
    align-items: center;
}

.tst-checkbox > span {
    margin-left: 4px;
}
</style>