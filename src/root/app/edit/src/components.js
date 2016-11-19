'use strict';
//Ace Editor component
Vue.component('editor', {
    template: '<div class="editor"></div>',
    props: ['path', 'filename', 'client'],
    mounted: function(){
        this.editor = ace.edit(this.$el);
        this.editor.$blockScrolling = Infinity;
        this.editor.setTheme('ace/theme/monokai');
        this.editor.getSession().setMode('ace/mode/javascript');
        this.editor.getSession().setValue(boss.fs.get_file(this.path,this.filename));

        //on save
        $(this.$el).keydown((e) => {
            if(e.keyCode === 83 && e.ctrlKey && e.shiftKey){
                boss.fs.set_file(this.path, this.filename, this.editor.getSession().getValue(), this.client.user);
            }
        });
    }
});