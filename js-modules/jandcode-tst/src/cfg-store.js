/* Глобальный CfgStore для тестов
----------------------------------------------------------------------------- */
import {apx} from './vendor'

let _cfgStore

/**
 * Глобальный экземпляр cfgStore для тестов
 * @return {apx.CfgStore}
 */
export function getCfgStore() {
    if (_cfgStore == null) {
        _cfgStore = apx.createCfgStore(apx.jcBase.cfg.tst.module || 'tst')
        _cfgStore.load()
        _cfgStore.autoSave = true
    }
    return _cfgStore
}
