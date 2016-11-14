(function(args, client){
    'use strict';

    var config = {
        title: 'shell',
        type: 'component',
        componentName: 'shell',
        componentState: {}
    };

    boss.layout.root.contentItems[0].addChild(config);

    $('.shell').terminal(client.exec, {
        greetings: '',
        name: boss.fs.name,
        prompt: name + ': username$ '
    });
});