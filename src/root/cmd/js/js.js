(function(args, client){
    if(args.length > 1){
        try{
            boss.lib.print.log(eval(args[1]), client);
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    }
});