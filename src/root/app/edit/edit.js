(function(args, client){
    'use strict';

    var filename;
    var path;

    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1], client);
        path = result.path;
        filename = result.name;
    } else {
        path = client.cwd;
        var count = 1;
        while(!filename){
            var attempt = 'untitled' + count;
            try{
                boss.fs.get_file(path, attempt);
            } catch(err){
                //file doesn't exist nice!
                filename = attempt;
            }
            count++;
        }
        boss.fs.set_file(path, filename, '', client.user);
    }

    if(filename){

        var counter = window.app_number++;
        //load componenets
        eval(boss.fs.get_file('/app/edit', 'components.js'));

        var config = {
            title: 'edit',
            type: 'component',
            componentName: 'editor-' + counter,
            componentState: {}
        };

        window.layout.registerComponent('editor-' + counter, function( container, state ){
            container.getElement().html(
                '<div id="app-' + counter + '" class="app">' +
                    '<editor-app :path="path" :filename="filename" :client="client" :app_number="app_number">' +
                    '</editor-app>' +
                '</div>'
            );
        });

        window.layout.root.contentItems[0].addChild(config);

        var vm = new Vue({
            el: '#app-' + counter,
            data: {
                path: path,
                filename: filename,
                client: client,
                app_number: counter
            }
        });

    } else if(!filename) {
        boss.lib.print.error('error: no file argument', client);
        client.flush();
    }
});