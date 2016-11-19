(function(){
    'use strict';
    var layoutConfig = {
        // settings: {
        //     hasHeaders: false
        // },
        content: [{
            type: 'row',
            content: []
        }]
    };
    boss.layout = new GoldenLayout(layoutConfig);
    boss.layout.init();
});
