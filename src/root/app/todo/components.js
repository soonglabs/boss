'use strict';


Vue.component('todo-app', {
    template: `<div class='todo-app'>
                <div class="todo-container">
                    <div class="todo-title">TODO</div>
                    <ul id="todos">
                        <li v-for="todo in todos">
                            <button 
                                class="btn" 
                                v-on:click="removeTodo(todo)" 
                                title="remove todo">
                                [<i class="fa fa-minus" aria-hidden="true">]
                                </i>
                            </button>
                            <button
                                class="btn" 
                                v-on:click="editTodo(todo)" 
                                title="edit todo">
                                [<i class="fa fa-pencil-square-o" aria-hidden="true"></i>]
                                </i>
                            </button>
                            {{ todo.title }}
                            <div class="todo-task">{{todo.task}}</div>
                        </li>
                    </ul>
                    <button 
                        class="btn" 
                        v-on:click="addTodo()" 
                        title="add todo">
                        [<i class="fa fa-plus" aria-hidden="true">]</i>
                    </button>
                </div>
              </div>`,
    methods: {
        addTodo: function(){
            this.todos.push({
                title: 'newdo',
                task: 'it never ends'
            });
        },
        removeTodo: function(todo){
            let index = this.todos.indexOf(todo);
            if(index >= 0){
                this.todos.splice(index, 1);
            }
        },
        editTodo: function(todo){
            let index = this.todos.indexOf(todo);
            if(index >= 0){
                this.todos.splice(index, 1);
            }
        }
    },
    data: function(){ 
        return {
            todos: [
                {
                    title: 'todo1',
                    task: 'finish todos'
                },
                {
                    title: 'todo2',
                    task: 'there\s more?'
                },
                {
                    title: 'todo3',
                    task: 'yes :('
                }
            ]
        }
    },
});