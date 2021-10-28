/**
 * Собирает параметры для showFrame из объекта.
 *
 * Если в inst указан атрибут `frame` или `showFrame`, то собирает:
 *
 * ```
 * {
 *      frame: props.frame,
 *      props: props.frameProps,
 *      ...props.showFrame
 * }
 * ```
 *
 * Иначе - возвращает null
 *
 * @param props какой то объект
 * @return {null}
 */
export function grabShowFrameOptions(props) {
    if (props.frame || props.showFrame) {

        let sfp = {}
        if (props.frame) {
            sfp.frame = props.frame
        }
        if (props.frameProps) {
            sfp.props = props.frameProps
        }
        if (props.showFrame) {
            Object.assign(sfp, props.showFrame)
        }
    } else {
        return null
    }
}