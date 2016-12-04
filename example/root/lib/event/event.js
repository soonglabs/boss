({
    'callbacks': [],
    'subscribe': function(name, callback){
        if(!boss.lib.event.callbacks[name]){
             boss.lib.event.callbacks[name] = [];
        }
        boss.lib.event.callbacks[name].push(callback);
    },
    'send': function(name){
         if(boss.lib.event.callbacks[name]){
             boss.lib.event.callbacks[name].forEach(function(callback){
                 callback();
             });
        }
    }
});