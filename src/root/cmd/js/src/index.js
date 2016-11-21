(function(args, client){

    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1], client);
        var path = result.path;
        var name = result.name;
    }if(name){
        try{
            boss.lib.print.log(eval(boss.fs.get_file(path, name)), client);
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    } else if(!name) {
        boss.lib.print.error('error: no file argument', client);
    }
})