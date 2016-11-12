(function(args, client){
    'use strict';

     if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1]);
        var path = result.path;
        var filename = result.name;
     }

    if(filename){

        var template = "<div id='editor'></div>";
        var vm = new boss.lib.VueApp(template, {
            el: '#editor'
        });

        vm.change = false;
        vm.editor = ace.edit('editor');
        vm.editor.$blockScrolling = Infinity;
        vm.editor.setTheme('ace/theme/monokai');
        vm.editor.getSession().setMode('ace/mode/javascript');
        vm.editor.getSession().setValue(boss.fs.get_file(path,filename));

        //on editor change
        vm.editor.on('change', function(data){
            vm.change = true;
            $('.change-icon').css('color','red');
        });

        //on save
        $(vm.$el).keydown(function(e) {
            if(e.keyCode === 83 && e.ctrlKey  && e.shiftKey){
                vm.change = false;
                boss.fs.set_file(path, filename, vm.editor.getSession().getValue());
                $('.change-icon').css('color','green');
            }
        });

        //on exit
        $(vm.$el).keydown(function(e) {
            if(e.keyCode === 27 && vm.change){
                var c = confirm('You have unsaved changes. Would you like to exit?');
                if(c){
                    $(vm.$el).remove();
                }
            } else if(e.keyCode === 27 ){
                $(vm.$el).remove();
            }
        });

    } else if(!filename) {
        boss.lib.print.error('error: no file argument');
    }
});