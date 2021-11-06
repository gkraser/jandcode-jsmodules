/* Показ определенного фрейма из тестов.

Это можно использовать для тестирования фреймов, что бы открывался
сразу нужный и при перезагрузке страницы сразу попадать в нужный фрейм.

----------------------------------------------------------------------------- */

import {apx} from './vendor'
import * as main from '../src/index'

export function run() {
    apx.app.onAfterRun(() => {
        apx.showFrame({frame: import('../src/frames/Icons')})
    })
    main.run()
}
