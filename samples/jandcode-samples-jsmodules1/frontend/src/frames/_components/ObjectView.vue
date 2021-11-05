<template>
    <div>
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
