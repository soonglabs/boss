(function(){
    'use strict';

    var client = new boss.lib.TerminalClient(boss);
    var template = '<div class="shell"></div>';

    var layoutConfig = {
        content: [{
            type: 'row',
            content: [
                {
                    type: 'component',
                    componentName: 'shell',
                    componentState: {}
                }
            ]
        }]
    };

    var layout = new GoldenLayout(layoutConfig);
    layout.registerComponent('shell', function( container, state ){
        container.getElement().html(template);
    });
    layout.init();
    boss.layout = layout;

    var vm = new Vue({
        el: '.shell'
    });

    $(vm.$el).terminal(client.exec, {
        greetings: '',
        name: boss.fs.name,
        prompt: name + ': username$ '
    });
});