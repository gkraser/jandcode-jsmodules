import {apx, tst} from './vendor'

describe(module.id, function() {

    it("all icons", function() {
        let Comp = {
            template: `
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
            `,
            methods: {
                getIconNames() {
                    return Object.keys(apx.icons.getIcons())
                }
            }
        }
        tst.vueMount(Comp)
    })

})
    