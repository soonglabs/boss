({
    'callbacks': [],
    'subscribe': function(event, name, callback){
        if(!boss.lib.event.callbacks[event]){
             boss.lib.event.callbacks[event] = [];
        }
        boss.lib.event.callbacks[event].push({
            id: name,
            fn: callback
        });
    },
    'send': function(event, data){
        if(boss.lib.event.callbacks[event]){
            boss.lib.event.callbacks[event].forEach(function(callback){
                callback.fn(data);
            });
        }
    },
    'unsubscribe': function(event, name){
        if(boss.lib.event.callbacks[event]){
            boss.lib.event.callbacks[event].forEach(function(callback){
                if(callback.id === name){
                    boss.lib.event.callbacks = boss.lib.event.callbacks.splice(callback, 1);
                }
            });
        }
    }
});