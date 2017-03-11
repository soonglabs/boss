'use strict';

Vue.component('unique-div', {
    template: `<div></div>`,
    props: ['app_number'],
    mounted: function(){
        this.$el.id = 'uid-' + this.app_number;
    }
});

Vue.component('editor-app', {
    template: `<div class='editor-app'>
                 <div id='toolbar'>
                    <i class='fa fa-circle'  v-bind:class='{ dirty: changed, clean: !changed }' aria-hidden='true'></i>
                    {{filename}}
                 </div>
                 <unique-div :app_number='app_number' class='editor'></unique-div>

                    <!-- save modal -->
                    <div id="save-modal" class="modal">
                        <div class="modal-overlay"></div>
                        <div class="modal-container modal-small">
                            <div class="modal-header">
                                <button v-on:click="toggleSave" class="btn btn-clear float-right"></button>
                                <div class="modal-title">Save As</div>
                            </div>
                            <div class="modal-body">
                                <div class="content">
                                    <form>
                                        <input v-model="filename" tabindex="0"></input>
                                        <button v-on:click="save" class="btn" tabindex="1">[Save]</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>`,
    props: ['path', 'filename', 'client', 'app_number'],
    data: function(){ 
        return {
            changed: false
        }
    },
    methods: {
        toggleSave: function(){
            $('#save-modal').toggleClass('active');
        },
        save: function(){
            boss.lib.print.log('save file', this.client);
            boss.fs.set_file(this.path, this.filename, this.editor.getSession().getValue(), this.client.user);
            this.changed = false;
            $('#save-modal').toggleClass('active');
        }
    },
    mounted: function(){
        this.editor = ace.edit('uid-' + this.app_number);
        this.editor.$blockScrolling = Infinity;
        this.editor.setTheme('ace/theme/monokai');
        this.editor.getSession().setMode('ace/mode/javascript');
        this.editor.getSession().setValue(boss.fs.get_file(this.path,this.filename));

        //on save
        $(this.$el).keydown((e) => {
            if(e.keyCode === 83 && e.ctrlKey && e.shiftKey){
                $('#save-modal').toggleClass('active');
            }
        });

        this.editor.on('change', () => {
            this.changed = true;
        });
    }
});