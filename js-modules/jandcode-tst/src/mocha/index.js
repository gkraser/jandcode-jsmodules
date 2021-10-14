/*

    Поддержка mocha+chai в браузере

 */

import {jcBase} from '../vendor'
import mocha from 'mocha/mocha'
import chai from 'chai/chai'
import mochaCss from 'mocha/mocha.css'
import mochaCssFix from './mocha-fix.css'
import Chance from 'chance'

// css
jcBase.applyCss(mochaCss)
jcBase.applyCss(mochaCssFix)

//
let assert = chai.assert

function init() {
    // инициализация
    let mochaEl = document.getElementById("mocha")
    if (!mochaEl) {
        mochaEl = document.createElement('div')
        mochaEl.id = 'mocha'
        document.body.insertAdjacentElement('afterbegin', mochaEl)
    }
    // скрываем, что бы не мешалась
    mochaEl.style.display = 'none'

    // настраиваем
    mocha.setup('bdd')

    // покажем при первом запуске
    before(function() {
        mochaEl.style.display = 'block'
    })
}

///
init()

export {
    mocha,
    chai,
    assert,
    Chance,
}

