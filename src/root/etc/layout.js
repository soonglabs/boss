(function(){
    'use strict';
    var layoutConfig = {
        // settings:{
        //     hasHeaders: true,
        //     constrainDragToContainer: true,
        //     reorderEnabled: true,
        //     selectionEnabled: false,
        //     popoutWholeStack: false,
        //     blockedPopoutsThrowError: true,
        //     closePopoutsOnUnload: true,
        //     showPopoutIcon: true,
        //     showMaximiseIcon: true,
        //     showCloseIcon: true
        // },
        // dimensions: {
        //     borderWidth: 5,
        //     minItemHeight: 10,
        //     minItemWidth: 10,
        //     headerHeight: 20,
        //     dragProxyWidth: 300,
        //     dragProxyHeight: 200
        // },
        // labels: {
        //     close: 'close',
        //     maximise: 'maximise',
        //     minimise: 'minimise',
        //     popout: 'open in new window'
        // },
        content: [{
            type: 'stack',
            content: []
        }]
    };
    if(!window.layout){
        window.layout = new GoldenLayout(layoutConfig, $('#glayout'));
        window.layout.init();
    }
});
