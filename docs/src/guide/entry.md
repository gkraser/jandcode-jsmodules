Entry point
===========

Entry point - это модуль, с которого начинается загрузка приложения. Почитать об этом
можно в [документации](https://webpack.js.org/concepts/#entry) webpack.

Как уже [было сказано](./build.md#main-entry), в конфигурации webpack определена entry с
именем `main`, которая указывает на файл `./src/index.js`.

Модуль, который является точкой входа, должен экспортировать функцию с именем `run()`,
которая будет вызвана после подключения собранного бандла на странице.

Таким образом, типичный `index.js` (или любой другой модуль, выбранный как entry), должен
иметь такое содержимое как минимум:

```js
export function run() {
    // код приложения
}
```

Собранный бандл, который подключается на странице html, доступен через глобальную
переменную `JcEntry` (см. [тут](./build.md#library-name)). Эта переменная содержит все,
что экспортирует модуль entry.

Например, имеем такой `index.js`:

```js title=index.js
export function run() {
    console.info("run method called!");
}

export function run2() {
    console.info("run2 method called!");
}
```

Тогда в html можно использовать такой скрипт:

```html
...
<script>
    JcEntry.run()
    JcEntry.run2()
</script>
...
```



