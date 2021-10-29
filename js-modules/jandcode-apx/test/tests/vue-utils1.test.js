import {tst} from './vendor'

import * as m from '../../src/vue/utils'

describe(module.id, function() {

    it("normalizeCompName", function() {
        tst.assert.equal(m.normalizeCompName('jc-panel-body'), 'JcPanelBody')
        tst.assert.equal(m.normalizeCompName('JcPanelBody'), 'JcPanelBody')
    })

})

