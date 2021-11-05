Роутинг
=======
         
@@code-info ref="https://www.npmjs.com/package/path-to-regexp|path-to-regexp"

Введение
--------

В `apx` отсутствует "настоящий" роутинг. Вместо этого используется понятие
["фреймы"](./frames.md).

Однако имеется возможность зарегистрировать некоторые фреймы с короткими именам, типа "
path", и при показе фрейма использовать этот короткий путь вместо конкретного
компонента-фрейма.

Пример регистрации:

```js
import {apx} from './vendor'
import Home from './frames/Home'
import Frame1 from './frames/Frame1'

let routes = [
    // пустой путь - страница по умолчанию
    {path: '', frame: Home},

    // path должен начинатся с '/'
    {path: '/frame1', frame: Frame1},

    // можно (даже желательно) регистрировать динамический импорт фрейма
    {path: '/frame1-1', frame: import('./frames/Frame1')},
]

apx.app.run(() => {
    // инициализируем router, обязательно внутри app.apx.run - обработчика
    apx.app.frameRouter.addRoutes(routes)
    // ...
})
```

Зарегистрированный фрейм можно показать так:

```js
apx.showFrame({
    frame: '/frame1', props: {prop1: 1}
})
```

Изменение hash страницы при показе фрейма
-----------------------------------------


