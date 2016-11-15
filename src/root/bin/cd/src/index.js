(function(args, client){
    if(args[1]){
        try{
            var path = boss.lib.utils.calcAbsPath(args[1], null, client);
           client.cwd = path;
            var list = path.split('/');
            boss.lib.set_prompt((list.length <= 1 ? '' : list[list.length - 1]), client);
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    } else if(!args[1]){
        boss.lib.print.error('error: no directory argument', client);
    }
})