(function(args, client){
    'use strict';

    return new boss.lib.App(args, client, {
        name: '<i class="fa fa-book app-icon"></i>Editor',
        message: ' - <i class="fa fa-circle change-icon" style="color:green;"></i> ',
        selector: "#shell",
        template: '"<div id="shell"><div id="term" style="width:100%;height:95%;"></div></div>"',
        css: "position:absolute;top:50px;left:0px;width:100%;height:95%;margin:5px;",
        onLoad : (app, args, client) => {
            $('#term').terminal(client.exec, {
                greetings: '',
                name: 'boss',
                prompt: name + ': username$ '
            });
        },
        onDestroy : (app, args, client) => {}
    })
})