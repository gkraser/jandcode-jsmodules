import {assert} from 'chai'
import * as m from '../../src/popup'

describe("utils/popup", function() {

    it("manager inited", function() {
        assert.ok(m.popupManager instanceof m.PopupManager)
    })


})
    