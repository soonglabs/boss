(function(args, client){
    'use strict';
    var counter = boss.app_number++;
    //load componenets
    eval(boss.fs.get_file('/app/shell', 'components.js'));
    var prompt = ': username$ ';
    var config = {
        title: 'shell',
        type: 'component',
        componentName: 'shell-' + counter,
        componentState: {}
    };

    if(!client){
        client = new boss.lib.TerminalClient();
        client.push(new boss.lib.Login(boss).username);
    } else {
        var newClient = new boss.lib.TerminalClient();
        newClient.user = client.user;
        newClient.cwd = client.cwd;
        newClient.interpreters = client.interpreters.slice(0);
        var parts = newClient.cwd.split('/');
        var dir = parts[parts.length - 1];
        prompt = ': ' + dir + '$ ';
        client = newClient;
    }

    boss.layout.registerComponent('shell-' + counter, function(container, state){
        container.getElement().html('<div id="app-' + counter + '" class="app">' +
                                        '<shell :prompt="prompt" :name="name" :greeting="greeting"></shell>' +
                                    '</div>');
    });

    boss.layout.root.contentItems[0].addChild(config);

    var vm = new Vue({
        el: '#app-' + counter,
        data: {
            name:  boss.fs.name,
            prompt: boss.fs.name + prompt,
            greeting: null
        },
        methods: {
            client: client.exec,
            completion: function(terminal, string, callback){
                var completions = Object.keys(boss.cmd);
                completions = completions.concat(boss.fs.get_contents(client.cwd));
                var parts = string.split('/');
                parts.splice(-1, 1);
                var str = parts.join('/');
                var path = boss.lib.utils.calcAbsPath(str, null, client);
                var subContents = boss.fs.get_contents(path);
                subContents.forEach(function(content){
                    completions.push(str + '/' + content);
                });
                callback(completions);
            }
        }
    });
});