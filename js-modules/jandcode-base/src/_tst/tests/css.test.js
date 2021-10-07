import {assert} from 'chai'
import '@jandcode/base'

describe("css", function() {

    function css(name) {
        return {css: true, filename: name + '.css', text: '.t{color:name}', group: 'g1'}
    }

    function clearCss() {
        let a
        a = document.querySelectorAll("style[data-group=g1]")
        a.forEach(n => n.parentNode.removeChild(n))
    }

    Jc.defineCssPlace('p1')
    Jc.defineCssPlace('p2')

    beforeEach(function() {
        clearCss()
    });

    it("no places", function() {
        Jc.applyCss(css('1'))
        Jc.applyCss(css('2'))
    })

    it("places", function() {
        Jc.applyCss(css('1'))
        Jc.applyCss(css('2'))
        Jc.applyCss(css('3'), 'p1')
        Jc.applyCss(css('4'), 'p1')
        Jc.applyCss(css('5'), 'p2')
        Jc.applyCss(css('6'), 'p2')
    })

})
    