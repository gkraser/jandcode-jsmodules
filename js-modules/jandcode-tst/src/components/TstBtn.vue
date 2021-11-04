<template>
    <div class="tst-btn">
        <button class="tst-btn">{{ label }}</button>
    </div>
</template>

<script>
//! событие click транслируется автоматом
export default {
    name: 'TstBtn',
    props: {
        label: {
            type: String,
        }
    },
}
</script>
