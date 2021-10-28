<template>
    <tst-panel>
        <div class="q-gutter-x-md">
            <q-btn no-caps label="bus" icon="bus"/>
            <q-btn no-caps label="calc1: png image" icon="calc1"/>
            <q-btn no-caps label="folder1: svg image" icon="folder1"/>
        </div>
    </tst-panel>
</template>

<script>
import {apx} from '../vendor'

apx.icons.registerIcons({
    'calc1': require('../_images/calc.png'),
    'folder1': require('../_images/folder.svg'),
})

export default {
}
</script>

