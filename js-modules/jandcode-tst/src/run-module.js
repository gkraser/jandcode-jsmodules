import {jcBase, apx} from './vendor'

/**
 * Запуск модуля
 * @param moduleName имя модуля.
 *        Должен иметь метод run.
 */
export async function runModule(moduleName) {
    console.info("tst run module", moduleName);

    let modulePathInfo = jcBase.path.parse(moduleName)
    document.title = modulePathInfo.filename + ' - ' + modulePathInfo.path

    let m = await jcBase.loadModule(moduleName)

    if (m.run) {
        m.run()

    } else if (moduleName.endsWith(".vue") || m.vue) {
        let p = m.vue || m.default || m
        //

        // данные для тестов, загружаются в tstData асинхронно, если есть такая опция
        // в компоненте доступны через this.$attrs.tstData
        let tstData = {}   //todo tstData
        if (jcBase.isFunction(p.tstData)) {
            await p.tstData(tstData)
        }

        if (!jcBase.app.isRunned()) {
            // приложение не запущено - запускаем свое
            await jcBase.app.run(() => {
                let vm = apx.createVueApp(p)
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
