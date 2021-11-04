import {assert} from 'chai'
import * as m from '../../src/css'

import css1 from './data/css1.css'

describe("css", function() {

    function css(name) {
        return {css: true, filename: name + '.css', text: '.t{color:name}', group: 'g1'}
    }

    function clearCss() {
        let a
        a = document.querySelectorAll("style[data-group=g1]")
        a.forEach(n => n.parentNode.removeChild(n))
    }

    m.defineCssPlace('p1')
    m.defineCssPlace('p2')

    beforeEach(function() {
        clearCss()
    });

    it("no places", function() {
        m.applyCss(css('1'))
        m.applyCss(css('2'))
    })

    it("places", function() {
        m.applyCss(css('1'))
        m.applyCss(css('2'))
        m.applyCss(css('3'), 'p1')
        m.applyCss(css('4'), 'p1')
        m.applyCss(css('5'), 'p2')
        m.applyCss(css('6'), 'p2')
    })

    it('css-loader-1', function() {
        console.info("css1", css1);
        assert(m.isCssLoaderExport(css1) === true)
    });

})
    