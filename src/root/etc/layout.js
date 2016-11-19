(function(){
    'use strict';
    var layoutConfig = {
        content: [{
            type: 'row',
            content: []
        }]
    };
    boss.layout = new GoldenLayout(layoutConfig, $('#boss'));
    boss.layout.init();
});
