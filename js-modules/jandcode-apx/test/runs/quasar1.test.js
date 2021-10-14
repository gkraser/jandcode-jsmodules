//import {apx} from './vendor'

// import * as m from '../../js'


import {apx} from '../vendor'

export function run() {
    apx.app.run(() => {
        let Quasar = apx.Quasar

        console.info("Quasar", Quasar);
        console.info("Quasar.date", Quasar.date);
        console.info("Quasar.date.formatDate", Quasar.date.formatDate);

        console.info("formatDate", Quasar.date.formatDate("2010-12-30", "YYYY-MM-DD"))
    })
}



