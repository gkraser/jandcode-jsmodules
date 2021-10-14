import {apx} from './vendor'

import * as m from '../../src/vue/index'

// import * as m from '../../js'

describe(module.id, function() {

    it("createVueApp", function() {
        let vm = m.createVueApp()
        console.info(vm);
    })

})

