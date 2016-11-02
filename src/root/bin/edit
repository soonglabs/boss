(function(args,client){
    
    var result,path,filename,editor;
    
    return new boss.lib.App(args, client, {
        name: '<i class="fa fa-book app-icon"></i>Editor',
        message: ' - <i class="fa fa-circle change-icon" style="color:green;"></i> ',
        selector: "#editor",
        template: "<div id='editor'></div>",
        css: "position:absolute;top:50px;left:0px;width:100%;height:95%;margin:5px;",
        onLoad : (app, args, client) => {
                
            if(args.length > 1){
                var result = boss.lib.utils.splitPathFilename(args[1]);
                var path = result.path;
                var filename = result.name;
            }
            
            if(filename){
                
                client.toolbar.set_message(app.config.message + filename);
                    
                var run = function(){
                    
                    app.change = false;
                    app.editor = ace.edit('editor');
                    app.editor.$blockScrolling = Infinity;
                    app.editor.setTheme('ace/theme/monokai');
                    app.editor.getSession().setMode('ace/mode/javascript');
                    app.editor.getSession().setValue(boss.fs.get_file(path,filename).data);
                    
                    //on editor change
                    app.editor.on('change', function(data){
                        app.change = true;
                        $('.change-icon').css('color','red');
                    });
                    
                    //on save
                    $(app.config.selector).keydown(function(e) {
                        if(e.keyCode === 83 && e.ctrlKey  && e.shiftKey){
                            app.change = false;
                            boss.fs.get_file(path,filename).data = app.editor.getSession().getValue();
                            boss.fs.save();
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
        onDestroy : (app, args, client) => {
            client.toolbar.set_title('<i class="fa fa-terminal app-icon"></i>Shell');
            client.toolbar.set_message('');
        }
    })
})
