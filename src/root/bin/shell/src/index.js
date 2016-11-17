(function(args, client){
    'use strict';
    var newClient = new boss.lib.TerminalClient(boss);
    newClient.user = client.user;
    newClient.cwd = client.cwd;
    var parts = newClient.cwd.split('/');
    var dir = parts[parts.length - 1];
    var counter = boss.app_number++;

    var config = {
        title: 'shell',
        type: 'component',
        componentName: 'shell-' + counter,
        componentState: {}
    };

    boss.layout.registerComponent('shell-' + counter, function(container, state){
        container.getElement().html('<div id="app-' + counter + '" class="app"><shell :prompt="prompt" :name="name" :greeting="greeting"></shell></div>');
    });

    boss.layout.root.contentItems[0].addChild(config);

    var vm = new Vue({
        el: '#app-' + counter,
        data: {
            name:  boss.fs.name,
            prompt: boss.fs.name + ': ' + dir + '$ ',
            greeting: null
        },
        methods: {
            client:  newClient.exec
        }
    });
});