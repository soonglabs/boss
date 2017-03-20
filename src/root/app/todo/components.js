'use strict';

Vue.component('todo-app', {
    template: `<div class='todo-app'>
                  <div class="add-new-container" style="margin-top: 5px;">
                    <div class="add-new">
                        <div class="add-new-title">Add Todo</div>
                        <form>
                            <div class="form-group container">
                                <textarea v-model="newTodo.text" placeholder="text" cols=50 rows=3></textarea>
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
                            <pre class="todo-title">{{ todo.text }}</pre>
                            <div class="btn-group" style="float:left;">
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
                                </button>
                            </div>
                            <div v-if="todo.editing" class="edit-container dark-shadow">
                                <div class="add-new">
                                    <div class="add-new-title">Edit Todo</div>
                                    <form>
                                        <div class="form-group container">
                                            <textarea v-model="todo.text" placeholder="text" cols=50 rows=5></textarea>
                                           <button 
                                                class="btn blue-b" 
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
                text: this.newTodo.text,
                editing: false
            });
            this.newTodo.text = 'text';
            this.save();
        },
        removeTodo: function(todo){
            let index = this.todos.indexOf(todo);
            if(index >= 0){
                this.todos.splice(index, 1);
            }
            this.save();
        },
        editTodo: function(todo){
            todo.editing = true;
        },
        closeEdit: function(todo){
            todo.editing = false;
            this.save();
        },
        save: function(){
            boss.fs.set_file('/home/' + this.client.user.username + '/documents', 'todos.json', JSON.stringify(this.todos), client.user);
        }
    },
    props: ['client'],
    data: function(){ 
        return {
            todos: [],
            newTodo: {
                text: 'text'
            }
        }
    },
    mounted: function(){
        let json;
        try{
            json = boss.fs.get_file('/home/' + this.client.user.username + '/documents','todos.json');
        } catch(err){
            json = "[]";
            boss.fs.set_file('/home/' + this.client.user.username + '/documents', 'todos.json', json, client.user);
        }
        this.todos = JSON.parse(json);
    }
});