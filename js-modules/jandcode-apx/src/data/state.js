import {jcBase, Vue} from '../vendor'

let {reactive} = Vue

/**
 * Объект с явно выделенныем состоянием в свойстве state
 */
export class BaseState {

    constructor() {
        // состояние, реактивное свойство
        this.__state = reactive({})
    }

    /**
     * Текущее состояние, реактивное свойство.
     * @return {Object}
     */
    get state() {
        return this.__state
    }

    /**
     * Обновить состояние.
     * @param {Object} state объект с подмножеством состояния, рекурсивно накладывается
     * на текущее состояние. Если не указан, то берется результат выполнения grabState
     */
    updateState(state = null) {
        if (!state) {
            state = this.grabState()
            if (!state) {
                return
            }
        }
        jcBase.mergeDeep(this.state, state)
    }

    /**
     * Изменить маркер, имитируя изменение соответствующего свойства в marker.
     * Изменения маркера можно использовать для отслеживания какой-то группы изменений в
     * объекте.
     *
     * @param {Object} markerName имя маркера, это свойство в state.marker
     */
    touchStateMarker(markerName) {
        let newValue = 1
        if (this.state.marker) {
            newValue = jcBase.toInt(this.state.marker[markerName]) + 1
        }
        this.updateState({
            marker: {
                [markerName]: newValue
            }
        })
    }

    /**
     * Собирает объект-состояние по свойствам объекта.
     * Результат можно передавать в updateState
     * @return {Object} подмножество состояния
     */
    grabState() {
        return {}
    }

}