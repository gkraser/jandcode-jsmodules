webpack
=======

WebpackBuilder
--------------

`WebpackBuilder` предназначен для построения конфигурации `webpack`. Пример использования
в проекте (файл `webpack.config.js`):

```js
let jcTools = require("@jandcode/tools")
let builder = new jcTools.WebpackBuilder(__dirname)
builder.merge({})  // дополнительная конфигурация для приложения
module.exports = builder.build()
```

WebpackBuilderPlugin
--------------------

Базовый класс для плагинов `WebpackBuilder`. Пример:

```js
let jcTools = require("@jandcode/tools")
let builder = new jcTools.WebpackBuilder(__dirname)

class MyPlugin extends jcTools.WebpackBuilderPlugin {

    // строим конфигурацию для merge
    buildConfig(builder) {
        return {
            resolve: {
                alias: {
                    'jquery$': 'jquery/dist/jquery.slim.js'
                }
            }
        }
    }

    //  изменяем построенную конфигурацию
    updateConfig(builder, config) {
        config.devtool = false
    }
}

// подключаем плагин
builder.merge(new MyPlugin())

module.exports = builder.build()
```

Можно реализовывать метод `buildConfig` или `updateConfig` или оба.

*.dyn.js
--------

Файлы с суффиксом `.dyn.js` обрабатываются `val-loader`, т.е. результат их выполнения
является кодом модуля.

