(function(args,client){
    'use strict';
    var result,path,filename,editor;

    return new boss.lib.App(args, client, {
        name: '<i class="fa fa-book app-icon"></i>Editor',
        message: ' - <i class="fa fa-circle change-icon" style="color:green;"></i> ',
        selector: "#editor",
        template: "<div id='editor'></div>",
        css: "position:absolute;top:0px;left:0px;width:100%;height:100%;",
        onLoad : (app, args, client) => {

            if(args.length > 1){
                var result = boss.lib.utils.splitPathFilename(args[1]);
                var path = result.path;
                var filename = result.name;
            }

            if(filename){

                var run = function(){

                    app.change = false;
                    app.editor = ace.edit('editor');
                    app.editor.$blockScrolling = Infinity;
                    app.editor.setTheme('ace/theme/monokai');
                    app.editor.getSession().setMode('ace/mode/javascript');
                    app.editor.getSession().setValue(boss.fs.get_file(path,filename));

                    //on editor change
                    app.editor.on('change', function(data){
                        app.change = true;
                        $('.change-icon').css('color','red');
                    });

                    //on save
                    $(app.config.selector).keydown(function(e) {
                        if(e.keyCode === 83 && e.ctrlKey  && e.shiftKey){
                            app.change = false;
                            boss.fs.set_file(path, filename, app.editor.getSession().getValue());
                            $('.change-icon').css('color','green');
                        }
                    });

                    //on exit
                    $(app.config.selector).keydown(function(e) {
                        if(e.keyCode === 27 && app.change){
                            var c = confirm('You have unsaved changes. Would you like to exit?');
                            if(c){
                                app.config.onDestroy(app, args, client);
                                $(app.config.selector).remove();
                            }
                        } else if(e.keyCode === 27 ){
                           app.config.onDestroy(app, args, client);
                           $(app.config.selector).remove();
                        }
                    });
                };

                $.getScript("https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js", run);

            } else if(!filename) {
                boss.lib.print.error('error: no file argument');
            }
        },
        onDestroy : (app, args, client) => {}
    })
})
