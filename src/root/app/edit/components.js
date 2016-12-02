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
               </div>`,
    props: ['path', 'filename', 'client', 'app_number'],
    data: function(){ 
        return {
            changed: false
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
                boss.fs.set_file(this.path, this.filename, this.editor.getSession().getValue(), this.client.user);
                this.changed = false;
            }
        });

        this.editor.on('change', () => {
            this.changed = true;
        });
    }
});