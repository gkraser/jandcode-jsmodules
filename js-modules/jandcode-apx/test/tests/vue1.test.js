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

})

