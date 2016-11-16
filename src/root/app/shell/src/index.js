(function(){
    'use strict';
    var client = new boss.lib.TerminalClient(boss);
    var template = '<div id="app-1" class="app"><shell></shell></div>';
    var layoutConfig = {
        content: [{
            type: 'row',
            content: [
                {
                    title: 'shell',
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

    Vue.component('shell', {
        template: '<div class="shell"></div>',
        mounted: function(){
            console.log('mounted');
            $(this.$el).terminal(client.exec, {
                greetings: '',
                name: boss.fs.name,
                prompt: name + ': username$ '
            });
        }
    });

    var vm = new Vue({
        el: '#app-1'
    });
    boss.layout = layout;
});