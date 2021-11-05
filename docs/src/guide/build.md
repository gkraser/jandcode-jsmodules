Сборка проекта
==============

@@code-info lib=@jandcode/tools ref=../tools/webpack|WebpackBuilder

webpack
-------

В качестве сборщика проекта используется webpack.

Конфигурация webpack строится с помощью специального WebpackBuilder, входящего в
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

Каталог сборки
--------------

Проект собирается в каталог `frontend/_gen/frontend`. Это соглашение используется и в
других местах jandcode, поэтому не стоит менять этот каталог, хотя это и возможно.

Пример полной конфигурации webpack
----------------------------------

Пример полного файла сборки:

@@code file=samples1/frontend/webpack.config.js title=frontend/webpack.config.js

