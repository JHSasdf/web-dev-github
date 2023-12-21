const TodosApp = {
    data() {
        return {
            newToDo: 'Learn Vue.js!',
            enteredTodoText: ''
        };
    },
    methods: {
        saveTodo(event) {
            event.preventDefault();
            this.newToDo = this.enteredTodoText;
            this.enteredTodoText = '';
        }
    }
};


Vue.createApp(TodosApp).mount('#todos-app');