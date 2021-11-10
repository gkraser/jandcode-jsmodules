Настройка и сборка проекта
==========================

@@code-info lib=@jandcode/tools ref="../tools/webpack|@jandcode/tools webpack"

webpack
-------

В качестве сборщика проекта используется webpack.

webpack.config.js
-----------------

Конфигурация webpack строится с помощью `WebpackBuilder`, входящего в
поставку `jandcode-jsmodules`.

Минимальная конфигурация webpack выглядет так:

```js title=frontend/webpack.config.js
let jcTools = require("@jandcode/tools")
let builder = new jcTools.WebpackBuilder(__dirname)
module.exports = builder.build()
```

Результатом работы `builder.build()` будет конфигурация `webpack`, ее можно модифицировать
при необходимости. Или напечатать для отладки.

Например можно посмотреть настроенные алиасы:

```js
console.info("module.exports.resolve.alias", module.exports.resolve.alias);
```

Имея конфигурацию webpack, мы можем собрать проект.

В корне проекта `jandcode-samples-jsmodules1` (предпочтительный способ):

```
jc nodejs-build
```

Или (в каталоге `jandcode-samples-jsmodules1/frontend`):

```
jc @ npm run build
```

Или (в каталоге `jandcode-samples-jsmodules1/frontend`):

```
jc @ webpack
```

!!! note

    Команда `jc nodejs-build` фактически вызывает `jc @ npm run build`, но, перед
    запуском, она проверяет и, при необходимости, устанавливает зависимости npm.  

Настройка конфигурации webpack
------------------------------

Базовая конфигурация webpack генерируется автоматически. Она включает в себя все
необходимые настройки для сборки приложения.

При необходимости ее можно расширить. Для этого используется метод `merge`:

```js title=frontend/webpack.config.js
let jcTools = require("@jandcode/tools")
let builder = new jcTools.WebpackBuilder(__dirname)
builder.merge({
    plugins: [],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
})
module.exports = builder.build()
```

Метод `merge` под капотом
использует [webpack-merge](https://www.npmjs.com/package/webpack-merge).


Плагин WpbApxPlugin
-------------------

Плагин `WpbApxPlugin` для `WebpackBuilder` используется для настройки конфигурации webpack
по соглашениям модуля [@jandcode/apx](../apx/index.md). Его использование обязательно,
если вы используете в приложении этот модуль.

Подключение плагина:

```js
let jcTools = require("@jandcode/tools")
let builder = new jcTools.WebpackBuilder(__dirname)
let WpbApxPlugin = require('@jandcode/apx/wpb-plugin')
builder.merge(new WpbApxPlugin({
    apxModules: [
        '@jandcode/apx-map',
        '@jandcode/apx-datagrid',
    ],
    tstModules: [
        '@jandcode/apx',
        '@jandcode/apx-ui',
    ],
    themes: [
        'apx-std',
    ],
    themeDefault: 'app',
}))
module.exports = builder.build()
```

Краткое описание опций:

* `apxModules` - список модулей, которые будут использоватся для построения приложения.
  Это модули, которые зависят от модуля [](../apx/index.md) и предоставляют приложению
  определенную информацию, например иконки, темы и т.д. Если модуль не включить сюда, но
  использовать в коде, то работать он будет и без этого. Но если этот модуль
  предоставляет, например, иконки, то они в проект включены не будут. В этот список
  автоматически включены модули [](../apx/index.md) и  [](../apx-ui/index.md).
* `tstModules` - список модулей, чьи тесты будут отображатся в среде тестирования.
  (см: [](./tst.md)). Сюда автоматически включен модуль, в рамках которого используется
  `webpack.config.js`, т.е. `frontend` в данном случае.
* `themes` - список [тем](./theme), которые будет доступны в приложении
* `themeDefault` - [тема](./theme) по умолчанию

main entry  {#main-entry}
----------

В качестве основной [точки входа](https://webpack.js.org/concepts/#entry)
приложения используется модуль `'./src/index.js`, который регистрируется как entry с
именем `main`.

Зарезервированной является еще одна entry: `tst`. Остальные, при необходимости, можете
определять как нужно приложению.

library name {#library-name}
------------

При сборке проекта используется следующая
настройка [library](https://webpack.js.org/configuration/output/#outputlibrary):

```js
module.exports = {
  // …
  output: {
    library: 'JcEntry',
    type: 'var'
  },
};
```

Каталог сборки
--------------

Проект собирается в каталог `frontend/_gen/frontend`. Это соглашение используется и в
других местах jandcode, поэтому не стоит менять этот каталог, хотя это и возможно.


entrypoints-manifest.json {#entrypoints-manifest}
-------------------------

При сборке проекта генерируется специальный файл манифеста `entrypoints-manifest.json`, в
котором указаны все entry, определенные в проекте.

Пример:

```json title=entrypoints-manifest.json
{
  "main": {
    "assets": {
      "js": [
        "vendors.bundle.js",
        "main.bundle.js"
      ]
    }
  },
  "tst": {
    "assets": {
      "js": [
        "vendors.bundle.js",
        "tst.bundle.js"
      ]
    }
  }
}
```

Пример полной конфигурации webpack
----------------------------------

Пример полного файла сборки:

@@code file=samples1/frontend/webpack.config.js title=frontend/webpack.config.js

