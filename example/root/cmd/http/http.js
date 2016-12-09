(function(args, client){
    $.get(args[1], function( data ) {
        boss.lib.print.log(JSON.stringify(data), client);
    });
});