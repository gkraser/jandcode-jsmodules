Установка
=========

## Настройка среды

Проект предназначен для работы в качестве расширения проекта jandcode-core2.

Для начала необходимо, что бы был установлен [Jandcode Core2](https://gkraser.github.io/jandcode-core2/intro/install.html).

## Установка

В рабочий каталог для проектов (например `D:\jc-projects` для Windows или `~/jc-projects` для Linux) необходимо клонировать проект `jandcode-jsmodules`:

```
cd /D D:\jc-projects
git clone https://github.com/gkraser/jandcode-jsmodules
```

Переключите проект `jandcode-jsmodules` на нужную ветку. В данный момент - это ветка `dev`:

```
git checkout dev
```

Необходимо создать (или иметь готовый) проект jandcode:

```
cd /D D:\jc-projects
jc create -t:apx-app -o:jcsample-project2
```

Проект необходимо настроить для работы с nodejs, описано [тут](https://gkraser.github.io/jandcode-core2/web/nodejs.html).

В `beforeLoad` проекта дополнительно добавьте загрузку проекта `jandcode-jsmodules`:

```groovy
class Project1 extends ProjectScript {
        
    static beforeLoad = {
        // ...
        // загружаем проект jandcode-jsmodules
        load("../jandcode-jsmodules")
    }
    
    // ...
    
}
```

Создайте модуль `frontend`:

```
cd /D D:\jc-projects
cd jcsample-project2
mkdir frontend
cd frontend
npm init -y
```

На этом все, можно пользоваться.



