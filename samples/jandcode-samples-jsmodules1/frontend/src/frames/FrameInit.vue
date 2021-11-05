<template>
    <decor-page>
        <div class="q-gutter-md">
            <div>users: {{ users }}</div>
            <div>dummyList: {{ frameData.dummyList }}</div>
            <div>post: {{ frameData.post }}</div>
        </div>
    </decor-page>
</template>

<script>
import {apx} from '../vendor'

export default {
    extends: apx.JcFrame,
    // свойства фрейма
    props: {
        // количество генерируемых строк
        cnt: {}
    },
    // метод будет вызван перед монтированием и показом
    // fw это экземпляр apx.FrameWrapper
    // функция может быть асинхронной
    async frameInit(fw) {
        // данные, которые необходимо заполнить
        let frameData = fw.frameData

        // свойства, которые были переданы фрейму при вызове showFrame
        let props = fw.props

        // берем значение свойств
        let cnt = apx.jcBase.toInt(props.cnt, 5)

        // проверяем их
        if (cnt > 10) {
            throw new Error('Слишком много строк заказано')
        }

        // используем свойства для формирования данных
        frameData.dummyList = []
        for (let i = 1; i <= cnt; i++) {
            frameData.dummyList.push({id: i, text: 'text-' + i})
        }

        // можно выполнять запросы
        let users = await apx.jcBase.ajax.request({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users'
        })
        frameData.users = users.data

        // даже несколько запросов
        let post = await apx.jcBase.ajax.request({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts/1'
        })
        frameData.post = post.data

        // в консоле печатается frameWrapper, можно посмотреть что загрузилось
    },
    created() {
        this.title = 'FrameInit demo'

        // frameData доступно как свойство компонента
        let frameData = this.frameData

        // можно использовать
        for (let user of frameData.users) {
            this.users.push(user.username)
        }

        // frameData можно напрямую использовать в шаблоне
    },
    data() {
        return {
            users: [],
        }
    },
}
</script>
