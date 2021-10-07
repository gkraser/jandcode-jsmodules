import {jcBase} from './vendor'
import './dyn-mods.dyn'

console.info("LOAD", module.id);

export function run() {
    console.info("cfg", jcBase.cfg);
}

