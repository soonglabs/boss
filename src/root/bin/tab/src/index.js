(function(args, client){
    'use strict';
    var newClient = new boss.lib.TerminalClient(boss);
    newClient.user = client.user;
    newClient.cwd = client.cwd;

    var config = {
        title: 'shell',
        type: 'component',
        componentName: 'shell',
        componentState: {}
    };

    boss.layout.root.contentItems[0].addChild(config);

    $('.shell').terminal(newClient.exec, {
        greetings: '',
        name: boss.fs.name,
        prompt: client.get_prompt()
    });
});