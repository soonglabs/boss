(function(args, client){
    'use strict';

    var filename;
    var path;

    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1], client);
        path = result.path;
        filename = result.name;
    }

    if(filename){

        var counter = boss.app_number++;

        var config = {
            title: 'edit',
            type: 'component',
            componentName: 'editor-' + counter,
            componentState: {}
        };

        boss.layout.registerComponent('editor-' + counter, function( container, state ){
            container.getElement().html('<div id="app-' + counter + '" class="app"><toolbar :filename="filename"></toolbar><editor :path="path" :filename="filename" :client="client"></editor></div>');
        });

        boss.layout.root.contentItems[0].addChild(config);

        var vm = new Vue({
            el: '#app-' + counter,
            data: {
                path: path,
                filename: filename,
                client: client
            }
        });

    } else if(!filename) {
        boss.lib.print.error('error: no file argument', client);
    }
});