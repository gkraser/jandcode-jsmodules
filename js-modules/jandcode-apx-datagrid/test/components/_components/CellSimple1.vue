<template>
    <div>
        <div>cell:{{ text }} = <b>{{ text2 }}</b></div>
    </div>
</template>

<script>
export default {
    props: {
        text: {},
        text2: {},
    },
    data() {
        return {}
    },
    mounted() {
        console.info("mount", this.text, this);
    },
    beforeUnmount() {
        console.info("UNMOUNT", this.text, this);
    },
    methods: {},
}
</script>
