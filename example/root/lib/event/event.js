({
    'callbacks': [],
    'subscribe': function(name, callback){
        if(!callbacks[name]){
             callbacks[name] = [];
        }
        callbacks[name].push(callback);
    },
    'send': function(name){
         if(callbacks[name]){
             callbacks[name].forEach(function(callback){
                 callback();
             });
        }
    }
});