(function(args){
    'use strict';

    var client = new boss.lib.TerminalClient(boss);
    var template = '<div class="shell"></div>';

    var vm = new boss.lib.VueApp(template, {
        el: '.shell'
    });

    $(vm.$el).terminal(client.exec, {
        greetings: '',
        name: boss.fs.name,
        prompt: name + ': username$ '
    });
});