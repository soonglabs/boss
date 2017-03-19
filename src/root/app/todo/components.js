'use strict';

Vue.component('todo-app', {
    template: `<div class='todo-app'>
                  <div class="add-new-container" style="margin-top: 5px;">
                    <div class="add-new">
                        <div class="add-new-title">Add Todo</div>
                        <form>
                            <div class="form-group container">
                                <input v-model="newTodo.title" placeholder="title"></input>
                                <input v-model="newTodo.task" placeholder="description" style="width"></input>
                                <button
                                    class="btn dark-b"
                                    v-on:click="addTodo()"
                                    title="add todo">
                                    [<i class="fa fa-plus" aria-hidden="true">]</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="todo-container">
                    <div class="todos-title">TODOS</div>
                    <ul id="todos">
                        <li v-for="todo in todos">
                            <span class="todo-title">{{ todo.title }}</span>
                            <div class="btn-group">
                                <button 
                                    class="btn light-b" 
                                    v-on:click="removeTodo(todo)" 
                                    title="remove todo">
                                    [<i class="fa fa-check" aria-hidden="true"></i>|
                                </button>
                                <button
                                    class="btn light-b" 
                                    v-on:click="editTodo(todo)" 
                                    title="edit todo">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>]
                                    </i>
                                </button>
                            </div>
                            <span class="todo-task">{{todo.task}}</span>
                            <div v-if="todo.editing" class="add-new-container dark-shadow">
                                <div class="add-new">
                                    <div class="add-new-title">Edit Todo</div>
                                    <form>
                                        <div class="form-group container">
                                            <input v-model="todo.title" placeholder="title"></input>
                                            <input v-model="todo.task" placeholder="description" style="width"></input>
                                            <button 
                                                class="btn dark-b" 
                                                v-on:click="closeEdit(todo)" 
                                                title="edit todo">
                                                [Save]
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
              </div>`,
    methods: {
        addTodo: function(){
            this.todos.push({
                title: this.newTodo.title,
                task: this.newTodo.task,
                editing: false
            });
            this.newTodo.title = 'title';
            this.newTodo.task = 'description';
        },
        removeTodo: function(todo){
            let index = this.todos.indexOf(todo);
            if(index >= 0){
                this.todos.splice(index, 1);
            }
        },
        editTodo: function(todo){
            todo.editing = true;
        },
        closeEdit: function(todo){
            todo.editing = false;
        }
    },
    data: function(){ 
        return {
            todos: [],
            newTodo: {
                title: 'title',
                task: 'description'
            }
        }
    },
});