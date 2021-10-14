//import {apx} from './vendor'

// import * as m from '../../js'

import * as Quasar from 'quasar'

describe(__filename, function() {

    it("1", function() {
        console.info("Quasar", Quasar);
        console.info("Quasar.date", Quasar.date);
        console.info("Quasar.date.formatDate", Quasar.date.formatDate);
        global.Q1 = Quasar

        console.info("f2", Quasar.date.formatDate("2010-12-30", "YYYY-MM-DD"))

    })

})

