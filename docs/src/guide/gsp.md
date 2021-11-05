Использование frontend в gsp
============================

@@code-info class=jandcode.core.web.std.gsp.JsIndexGspContext
class=jandcode.core.apx.web.gsp.FrontendIndexGspContext

После сборки модуля `frontend`, мы имеем каталог `frontend/_gen/frontend`, в котором
имеется собранное клиентское приложение. Теперь необходимо подключить этот собранный код к
генерируемой с помощью gsp странице html.

Конечно, можно воспользоваться
плагином [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/), однако
на практике чаще нужно полностью управлять генерацией страницы, к которой подключается
клиенский код.

Пример, как это можно сделать:

@@code
file=samples1/jandcode-samples-jsmodules1-main/src/jandcode/samples/jsmodules1/main/root/root.gsp

Класс `JsIndexGspContext` знает про наличие и формат [](./build.md#entrypoints-manifest) и
с использованием этой информации правильно генерирует подключение скриптов.
