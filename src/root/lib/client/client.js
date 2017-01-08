({
    //This is a hack so the navbar has access
    //to a client. Need to figure it out.
    'getClient': function(){
        return boss.client;
    },
    'setClient': function(client){
        boss.client = client;
    }
});