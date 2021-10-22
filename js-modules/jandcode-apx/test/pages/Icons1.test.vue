<template>
    <div>
        <div class="text-purple q-gutter-md" style="font-size: 2em">
            <template v-for="nm in getIconNames()">
                <q-icon :name="nm">
                    <q-tooltip>
                        {{ nm }}
                    </q-tooltip>
                </q-icon>
            </template>
        </div>
        <div>total: {{ getIconNames().length }}</div>
    </div>
</template>

<script>
import {apx} from '../vendor'

export default {
    props: {},
    data() {
        return {}
    },
    methods: {
        getIconNames() {
            return Object.keys(apx.icons.getIcons())
        }
    },
}
</script>

