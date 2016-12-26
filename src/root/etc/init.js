(function(){
    'use strict';
    if(!window.app_number){
        window.app_number = 0;
    }

    if(!window.instances){
        window.instances = [];
    }
    window.instances.push(boss);
});
