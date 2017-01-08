({
    //This is a hack so the navbar has access
    //to a client and maybe set other stuff. 
    //Not really true to the boss has no state philosophy.
    'getClient': function(){
        return boss.navbar.client;
    },
    'setClient': function(client){
        if(!boss.navbar){
            boss.navbar = {};
        }
        boss.navbar.client = client;
    },
    'setApps': function(apps){
        if(!boss.navbar){
            boss.navbar = {};
        }
        boss.navbar.apps = apps;
    },
    'getApps': function(){
        return boss.navbar.apps;
    },
});