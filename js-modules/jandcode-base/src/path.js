/* Утилиты для путей
----------------------------------------------------------------------------- */

/**
 * Рабор пути
 * @param path путь
 * @returns {Object} результат разбора
 * @example
 * let p = parse('/a/b/c.txt')
 * // result
 * {
 *   "path": "a/b/c.txt",
 *   "isRoot": true,
 *   "filename": "c.txt",
 *   "ext": "txt",
 *   "dirname": "a/b",
 *   "basename": "c",
 *   "parts": [
 *       "a",
 *       "b",
 *       "c.txt"
 *   ]
 * }
 */
export function parse(path) {
    let pt = path
    if (!pt) {
        pt = '';
    }
    // нормализация слешей
    pt = pt.trim()
    pt = pt.replace(/\\+/g, '/')
    pt = pt.replace(/\/+/g, '/')
    let isRoot = pt.startsWith("/")
    if (isRoot) {
        pt = pt.substring(1)
    }
    if (pt.endsWith("/")) {
        pt = pt.substring(0, pt.length - 1)
    }
    let res = {
        path: pt,
        isRoot: isRoot,
        filename: '',
        ext: '',
        dirname: '',
        basename: '',
    }
    if (pt.length > 0) {
        let parts = pt.split("/")
        res.filename = parts.pop()
        res.dirname = parts.join('/')
        let a = res.filename.lastIndexOf('.')
        if (a === -1) {
            res.basename = res.filename
        } else {
            res.ext = res.filename.substring(a + 1)
            res.basename = res.filename.substring(0, a)
        }
    }

    return res
}