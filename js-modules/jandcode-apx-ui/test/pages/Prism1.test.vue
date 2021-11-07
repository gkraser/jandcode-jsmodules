<template>
    <tst-panel>
        <div class="q-gutter-md">
            <jc-btn label="Prism highlight" @click="highlight"/>
            <div>
                <pre><code class="lang-javascript">s="ssss"</code></pre>
            </div>
        </div>
    </tst-panel>
</template>

<script>
import {apx} from '../vendor'
import Prism from 'prismjs';
import prismCss from 'prismjs/themes/prism.css'

Prism.manual = true

apx.jcBase.applyCss(prismCss)

export default {
    methods: {
        highlight() {
            Prism.highlightAllUnder(this.$el)
        }
    }
}
</script>
