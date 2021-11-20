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
    mounted() {
        console.info("mount CellSimple1", this.text, this);
    },
    beforeUnmount() {
        console.info("UNMOUNT CellSimple1", this.text, this);
    },
}
</script>
