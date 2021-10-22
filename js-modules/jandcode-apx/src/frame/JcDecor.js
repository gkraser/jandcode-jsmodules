/**
 * Базовый предок для декораторов приложения и фреймов.
 */
export default {

    props: {
        /**
         * Ссылка на оформляемый компонент. Если не передавать, определяется как $parent.
         * Используется в случае, если декоратор не корневой компонент в шаблоне.
         */
        ownComp: {}
    },

    computed: {

        /**
         * Ссылка на оформляемый компонент.
         */
        own: function() {
            return this.ownComp ? this.ownComp : this.$parent
        }
    }
}