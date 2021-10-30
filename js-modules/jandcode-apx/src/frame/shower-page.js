import {FrameShower} from './shower'
import {Vue, jcBase} from '../vendor'

const {h} = Vue

/**
 * Показ фрейма как страницы
 */
export class FrameShower_page extends FrameShower {

    constructor(own) {
        super()
        /**
         * Экземпляр JcFrameShowerPage, который создал этот shower
         */
        this.own = own
    }

    destroy() {
        this.own.unmountFrame()
        super.destroy();
        this.own = null
    }

    async showFrameWrapper(fw) {
        // нужно ли помещать в стек
        let isStack = fw.options.stack
        // нужно ли заменить последний
        let isReplace = fw.options.replace

        let old_frames = null
        if (!isStack) {
            old_frames = this._frames
            this._frames = []
        } else {
            if (isReplace) {
                // replace в стеке
                // последний убираем для закрытия
                old_frames = []
                if (this._frames.length > 0) {
                    old_frames.push(this._frames.pop())
                }
            }
        }

        // сохраняем новый
        this._frames.push(fw)

        // сначала по быстрому монтируем фрейм
        // старый должен исчезнуть с экрана, но остался как экземпляр
        this.own.mountFrame(fw)
        // уведомляем
        fw.eventBus.emit('show', fw)

        if (old_frames != null) {
            // уничттожаем все старые, если новый не хочет быть в стеке
            while (old_frames.length > 0) {
                let fw = old_frames.pop()
                fw.destroy()
            }
        }

        this._activateFw(fw)
    }

    _activateFw(fw) {
        // меняем url
        let routeHash = fw.getRouteHash()
        jcBase.app.frameManager.history.updateHash(routeHash)

        // уведомляем заинтересованных в смене состава фреймов
        this.own.$emit('change', this)
    }

    isFrameWrapperClosable(fw) {
        if (!fw) {
            return false
        }
        if (this._frames.length <= 1) {
            return false
        }
        let idx = this._frames.indexOf(fw)
        // фрейм можно закрыть, если он последний в стеке
        return idx === this._frames.length - 1
    }

    async activateFrameWrapper(fw) {
        if (this._frames.length <= 1) {
            // стек либо пустой, либо там только один фрейм - ничего не делаем
            return
        }
        let idx = this._frames.indexOf(fw)
        if (idx === -1) {
            // этот фрейм не в стеке
            return
        }
        if (idx === this._frames.length - 1) {
            // это последний фрейм в стеке, он и так активный
            return
        }

        // проверяем возможность закрытия для всех после искомого
        let curIdx = this._frames.length - 1
        let closeIdx = null
        while (curIdx > idx) {
            if (!await this.checkClose(this._frames[curIdx])) {
                break
            }
            closeIdx = curIdx
            curIdx--
        }

        if (closeIdx == null) {
            // нечего закрывать
            return
        }

        // монтируем активный
        let fwActive = this._frames[closeIdx - 1]
        this.own.mountFrame(fwActive)

        // остальные уничтожаем
        while (this._frames.length > closeIdx) {
            let fwd = this._frames.pop()
            fwd.destroy()
        }

        // уведомляем
        fw.eventBus.emit('show', fwActive)

        this._activateFw(fwActive)
    }

    closeFrameWrapper(fw, cmd) {
        let a = this._frames.indexOf(fw)
        if (a === -1 || a === 0 || a !== this._frames.length - 1) {
            return // не наш фрейм или не последний
        }
        // активируем предпоследний
        this.activateFrameWrapper(this._frames[this._frames.length - 2])
    }
}

/**
 * vue компонент для указания местоположения shower.
 * @type {{}}
 */
export default {
    name: 'jc-frame-shower-page',

    props: {
        /**
         * Синхронизировать ли min-height с родительским элементом.
         * По умолчанию - true.
         */
        syncMinHeight: {
            type: Boolean,
            default: true,
        },

        /**
         * Имя shower
         */
        name: {
            type: String,
            default: 'main'
        }
    },

    mounted() {
        this.shower = new FrameShower_page(this)
        this.lastMountedFw = null
        jcBase.app.frameManager.registerShower(this.name, this.shower)

        if (this.syncMinHeight) {
            this.$nextTick(() => {
                this.__rsw = jcBase.dom.resizeWatch(this.$el.parentNode, (ev) => {
                    this.doSyncMinHeight()
                })
            })
        }

    },

    unmounted() {
        if (this.__rsw) {
            this.__rsw.destroy()
        }
        this.unmountFrame()
        jcBase.app.frameManager.unregisterShower(this.name)
        this.shower.destroy()
    },

    render() {
        return h('div', {
            class: ['jc-frame-shower-page', 'jc-frame-shower-page--' + this.name],
            style: 'display:none;'
        })
    },

    methods: {

        /**
         * Примонтировать фрейм
         */
        mountFrame(fw) {
            this.unmountFrame()
            if (fw == null) {
                return
            }
            // добавляем el фрейма как первый элемент в parentNode
            this.$el.parentNode.prepend(fw.vueInst.$el)
            this.lastMountedFw = fw
            //
            this.doSyncMinHeight()
        },

        /**
         * Отмонтировать текущий показываемый фрейм.
         */
        unmountFrame() {
            if (this.lastMountedFw == null) {
                return
            }
            // возвращаем el фрейма туда, откуда взяли
            this.lastMountedFw.vueMountEl.appendChild(this.lastMountedFw.vueInst.$el)
            // уведомляем
            this.lastMountedFw.eventBus.emit('hide', this.lastMountedFw)
            this.lastMountedFw = null
        },

        doSyncMinHeight() {
            if (!this.syncMinHeight) {
                // не разрешено
                return
            }
            if (this.lastMountedFw == null) {
                // ничего не примонтировано
                return
            }
            let parentEl = this.$el.parentNode
            if (parentEl == null) {
                // нету parent
                return
            }
            let frameEl = this.lastMountedFw.vueInst.$el

            //
            let parentMh = parentEl.style.minHeight
            if (!parentMh) {
                // нет min-height у parent
                return
            }

            // устанавливаем
            frameEl.style.minHeight = parentMh
        }

    }
}