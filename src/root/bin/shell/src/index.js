(function(args, client){
    'use strict';

    return new boss.lib.App(args, client, {
        name: '<i class="fa fa-book app-icon"></i>Editor',
        message: ' - <i class="fa fa-circle change-icon" style="color:green;"></i> ',
        selector: "#shell",
        template: '"<div id="shell" style="width:100%;height:95%;"></div>"',
        css: "",
        onLoad : (app, args, client) => {
            $('#shell').terminal(client.exec, {
                greetings: '',
                name: 'boss',
                prompt: name + ': username$ '
            });
        },
        onDestroy : (app, args, client) => {}
    })
})