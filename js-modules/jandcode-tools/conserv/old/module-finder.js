let path = require('path')
let fs = require('fs')

/**
 * Цель - преобразование полного имени файла в имя, которое привязано к имени модуля.
 */
class ModuleFinder {

    constructor() {
        this.cache = {}
    }

    /**
     * Ищет имя модуля для полного имени файла
     * @param fullFileName
     * @return имя модуля или null, если не удалось определить
     */
    findModule(fullFileName) {
        if (!fullFileName) {
            return null
        }
        let fn = path.basename(fullFileName)
        let dir = path.dirname(fullFileName)
        let parts = [fn]

        while (true) {
            let curMod = this.cache[dir]
            if (curMod == null) {
                let packageJsonFile = path.resolve(dir, 'package.json')
                if (fs.existsSync(packageJsonFile)) {
                    try {
                        let rawdata = fs.readFileSync(packageJsonFile)
                        let packageJson = JSON.parse(rawdata)
                        let name = packageJson.name
                        curMod = {
                            name: name,
                            path: dir
                        }
                        this.cache[dir] = curMod
                    } catch(e) {
                        // ignore
                    }
                }
            }
            if (curMod != null) {
                parts.reverse()
                let relPath = parts.join('/')
                return curMod.name + "/" + relPath
            }
            fn = path.basename(dir)
            parts.push(fn)
            dir = path.dirname(dir)
            if (!dir) {
                break
            }
        }

        return null
    }
}

module.exports = ModuleFinder
