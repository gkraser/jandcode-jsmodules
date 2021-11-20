export class VueComponentWrapper {
    constructor(component, props) {
        this.component = component
        this.props = props
    }
}

export function createVueComponentWrapper(component, props) {
    return new VueComponentWrapper(component, props)
}

