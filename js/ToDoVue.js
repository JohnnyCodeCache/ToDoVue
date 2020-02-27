'use strict';

new Vue({
    el: "#app",
    data: {
        todos: [
            {
                "text": "Get Haircut",
                "done": false,
                "id": 1574269759324
            },
            {
                "text": "Buy Cheese",
                "done": false,
                "id": 1574273535111
            },
            {
                "text": "Get Quote for New Brakes",
                "done": false,
                "id": 1574276685963
            }
        ],
        todosDeleted: []
    },
    methods: {
        addTodo({ target }) {
            this.todos.push({ text: target.value, done: false, id: Date.now() });
            
            SortData(this.todos);
            
            target.value = '';
        },
        removeTodo(id) {
            let deletedToDo = this.todos.filter(todo => todo.id === id)[0];
            deletedToDo.deleteDateTime = Date.now();

            this.todosDeleted.push(deletedToDo);

            this.todos = this.todos.filter(todo => todo.id !== id);
        },
        checkBoxChecked(id) {
            //console.lot(this.$data);

            let thisBox = "checkBox__" + id;
            document.getElementById(thisBox).click();

            SortData(this.todos);
        }, 
        showHideData() {
            //alert("ShowHide Data");
            let isHidden = document.getElementById("AllDataDump").classList.contains("hidden");
            if (isHidden) {
                document.getElementById("AllDataDump").classList.remove("hidden");
            } else {
                document.getElementById("AllDataDump").classList.add("hidden");
            }
        }
    },
    watch: {
        todos: {
            handler() {
                //console.log('Todos changed!');
                localStorage.setItem('todos', JSON.stringify(this.todos));
                localStorage.setItem('todosDeleted', JSON.stringify(this.todosDeleted));
            },
            deep: true
        }
    },
    mounted() {
        //console.log('App mounted!');
        if (localStorage.getItem('todos')) this.todos = JSON.parse(localStorage.getItem('todos'));
        if (localStorage.getItem('todosDeleted')) this.todos = JSON.parse(localStorage.getItem('todosDeleted'));
    }
});

function SortData(arrIn) {
    arrIn.sort((a, b) => (a.text > b.text) ? 1 : -1);
}