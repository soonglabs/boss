(function(template, config){
    'use strict';
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
    return new Vue(config);
});