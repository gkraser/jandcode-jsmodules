/* Утилиты для среды
----------------------------------------------------------------------------- */

/**
 * Возвращает флаг по значению переменной среды.
 *
 * Если переменная среды не установлена, возвращаем defaultValue.
 * Если установлено true, on, 1 - возвращаем true, иначе false
 *
 * @param envVarName имя переменной среды
 * @param defaultValue значение по умолчанию
 * @return {boolean}
 *
 * @example
 * let isTst = envFlag('JC_ENV_TST', true)
 */
function envFlag(envVarName, defaultValue = false) {
    let value = process.env[envVarName]
    if (value == null) {
        return defaultValue
    } else {
        return value === 'true' || value === 'on' || value === '1'
    }
}

module.exports = {
    envFlag,
}
