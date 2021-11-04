import {tst} from './vendor'
import * as m from '../../src/vue/index'

// import * as m from '../../js'

describe(module.id, function() {

    it("createVueApp", function() {
        let vm = m.createVueApp({})
        console.info(vm);
    })

    it("frameInit", function() {
        let log = ''
        let vm = m.createVueApp({
            template: '<div></div>',
            created() {
                console.info("CREATED");
                log += 'created-'
            },
            frameInit() {
                console.info("FRAMEINIT");
                log += 'frameInit-'
            }
        })
        let el = document.createElement('div')
        vm.mount(el)
        console.info(vm);
        console.info("log", log);
    })

    it("not exist component", function() {
        let vm = m.createVueApp({})
        let z = vm.component("not-exists")
        tst.assert.equal(z, undefined)
    })

    it('component name', function() {
        let vm = m.createVueApp({})
        let Comp = {
            template: '<div></div>'
        }
        let appInst = vm.component("CompNumber1", Comp)
        let compDef = vm.component("CompNumber1")
        console.info("Comp", Comp);
        console.info("appInst", appInst);
        console.info("compDef", compDef);
        //
        let qbtn = vm.component("q-btn")
        console.info("q-btn", qbtn);
        let qBtn = vm.component("QBtn")
        console.info("QBtn", qBtn);
    });


})

