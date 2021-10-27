import {jcBase, apx} from './vendor'
import themes from 'all/themes'

/**
 * Запуск модуля
 * @param moduleName имя модуля.
 *        Должен иметь метод run.
 */
export async function runModule(moduleName) {
    let pi = jcBase.path.parse(moduleName)
    document.title = pi.filename + ' - ' + pi.path

    let m = await jcBase.loadModule(moduleName)
    let mi = jcBase.getModuleInfo(moduleName)

    jcBase.cfg.set({
        tst: {
            module: moduleName,
            filename: pi.filename,
            dirname: pi.dirname,
            moduleName: mi.moduleName,
        }
    })

    ////// theme
    let pageParams = jcBase.url.getPageParams()
    let themeName = pageParams.theme || 'default'
    let themeInfo = themes[themeName]
    if (!themeInfo) {
        themeInfo = themes['default']
    }
    if (!themeInfo || !themeInfo.theme) {
        themeInfo = {name: 'no-theme'}
    } else {
        jcBase.applyTheme(themeInfo.theme)
    }
    jcBase.cfg.tst.themeInfo = themeInfo


    //////

    if (m.run) {
        m.run()

    } else if (moduleName.endsWith(".vue") || m.vue) {
        let p = m.vue || m.default || m
        //

        // данные для тестов, загружаются в tstData асинхронно, если есть такая опция
        // в компоненте доступны через this.$attrs.tstData
        let tstData = {}
        if (jcBase.isFunction(p.tstData)) {
            await p.tstData(tstData)
        }

        if (!jcBase.app.isRunned()) {
            // приложение не запущено - запускаем свое
            await jcBase.app.run(() => {
                let vm = apx.createVueApp(p, {
                    tstData: tstData
                })
                vm.mount(jcBase.dom.getAppElement())
            })
        } else {

            throw new Error("app already runned...")

        }

    } else if (window.mocha) {
        mocha.run()

    } else {
        throw new Error(`No run() or mocha.run() in ${moduleName}`)
    }

}
