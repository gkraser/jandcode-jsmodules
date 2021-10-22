import {tst, apx} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    it("1", function() {
        console.info(apx);

        let Comp = {
            template:`
<jc-decor-app container style="width:400px;height:200px">
    <template #main>
        Hello
    </template>
</jc-decor-app>`
        }
        let z = tst.vueMount(Comp)
        
    })

})

