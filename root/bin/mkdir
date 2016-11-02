(function(args, client){

    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1]);
        var path = result.path;
        var dirname = result.name;
    }

    if(dirname){
        try{
            boss.fs.add_dir(path, new boss.fs.Dir(dirname, boss.fs.get_current_username(), path));
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    
        boss.fs.save();
    } else if(!dirname) {
        boss.lib.print.error('error: no dir argument', client);
    }
})