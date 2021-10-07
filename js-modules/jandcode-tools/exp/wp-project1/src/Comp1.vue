<template>
    <div class="comp1">
        Comp1: {{ p1 }}
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            p1: '11'
        }
    },
    methods: {},
}
</script>

<style>
.comp1 {
  color: green;
}
</style>
