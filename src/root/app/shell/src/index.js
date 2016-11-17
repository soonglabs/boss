(function(){
    'use strict';
    var counter = boss.app_number++;

    var layoutConfig = {
        content: [{
            type: 'row',
            content: [
                {
                    title: 'shell',
                    type: 'component',
                    componentName: 'shell-' + counter,
                    componentState: {}
                }
            ]
        }]
    };

    var layout = new GoldenLayout(layoutConfig);
    layout.registerComponent('shell-' + counter, function(container, state){
        container.getElement().html('<div id="app-' + counter + '" class="app"><shell :prompt="prompt" :name="name" :greeting="greeting"></shell></div>');
    });
    layout.init();

    var client = new boss.lib.TerminalClient(boss);
    var vm = new Vue({
        el: '#app-' + counter,
        data: {
            name:  boss.fs.name,
            prompt: boss.fs.name + ': username$ ',
            greeting: null
        },
        methods: {
            client: client.exec
        }
    });
    boss.layout = layout;
});