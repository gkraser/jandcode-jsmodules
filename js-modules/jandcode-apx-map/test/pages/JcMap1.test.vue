<template>
    <tst-panel class="jcmap1-test-a4f30ed7">

        <div>openlayers1</div>

        <div class="row q-gutter-x-md" style="min-height: 300px">
            <jc-map :options="opt1" class="col-2"/>
            <jc-map :options="opt2" class="col"/>
        </div>

    </tst-panel>
</template>

<script>
import '../vendor'

import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSMSource from 'ol/source/OSM'
import {fromLonLat} from 'ol/proj'

export default {
    components: {},
    created() {

        this.opt1 = {
            layers: [
                new TileLayer({
                    source: new OSMSource()
                })
            ],
            view: new View({
                center: fromLonLat([68.4, 46.9]),
                zoom: 4
            })
        }

        this.opt2 = {
            layers: [
                new TileLayer({
                    source: new OSMSource()
                })
            ],
            view: new View({
                center: fromLonLat([68.4, 46.9]),
                zoom: 4
            })
        }

    },
    data() {
        return {}
    },
    methods: {}
}
</script>

<style lang="less">

.jcmap1-test-a4f30ed7 {


}

</style>
