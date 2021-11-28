import * as m from '../../src/dom'

describe(module.id, function() {

    it("1", function() {
        let z = new m.PixelCalc({classList: ['sss']})
        let a

        a = z.getWidth("2em")
        console.info("a", a);

        a = z.getWidth(2.1)
        console.info("a", a);

        a = z.getHeight("3em")
        console.info("a", a);

        a = z.getHeight(3.1)
        console.info("a", a);
    })

    it("NNchar", function() {
        let z = new m.PixelCalc({classList: ['sss']})
        let a

        a = z.getWidth("10char")
        console.info("a", a);
    })

    it("scrollbar size", function() {
        let z = m.getScrollbarSize()
        console.info("scrollbar size", z);
    })

})

