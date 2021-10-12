@jandcode/tools
===============

Модуль с набором инструментов для разработки. Это модуль для node, не для клиента.
                         
Стандартный webpack-конфиг
--------------------------

Модуль `@jandcode/tools/webpack/std-config` - это стандартный конфиг для webpack.

Пример использования в проекте:

```js
let stdConfig = require("@jandcode/tools/webpack/std-config")
let {merge} = require('webpack-merge')

let appConfig = {
    // ваш конфиг приложения
}

module.exports = merge(stdConfig({
    basedir: __dirname
}), appConfig)
```

При необходимости его можно скопировать в папку проекта и модифицировать,
если возможностей `webpack-merge` будет не хватать.

### *.dyn.js

Файлы с суффиксом `.dyn.js` обрабатываются `val-loader`, т.е. результат их
выполнения является кодом модуля.

