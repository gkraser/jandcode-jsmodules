import {apx, tst} from './vendor'

// import * as m from '../../src/'

describe(module.id, function() {

    it("1", function() {
        let log = ''
        //
        apx.app.eventBus.on("e1", (e) => {
            log += e
        })
        apx.app.eventBus.emit("e1", 'hello-')
        tst.assert.equal(log, 'hello-')
    })

})

