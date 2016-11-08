(function(args, client){

    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1]);
        var path = result.path;
        var dirname = result.name;
    }

    if(dirname){
        try{
            boss.fs.set_dir(path, dirname);
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    } else if(!dirname) {
        boss.lib.print.error('error: no dir argument', client);
    }
})