(function(args, client){

    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1]);
        var path = result.path;
        var filename = result.name;
    }
    
    if(filename){
        try{
            boss.lib.print.log(boss.fs.get_file(path, filename), client);
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    } else if(!filename) {
        boss.lib.print.error('error: no file argument', client);
    }
})