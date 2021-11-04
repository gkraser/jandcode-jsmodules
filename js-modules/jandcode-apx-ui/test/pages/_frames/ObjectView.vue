<template>
    <div class="object-view">
        <template v-for="(v,k) in obj">
            <div class="row">
                <code class="col">{{ k }}:</code>
                <code class="col">{{ valueToString(v) }}</code>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        obj: Object,
    },
    methods: {
        valueToString(v) {
            if (v == null) {
                return 'null'
            } else {
                return v.toString()
            }
        }
    }
}
</script>

<style lang="less">
.object-view {
    .row {
        padding: 4px;
    }

    .row:hover {
        background-color: #e2e8ea;
    }
}
</style>