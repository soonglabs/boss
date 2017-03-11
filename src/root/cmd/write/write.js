(function(args, client){
    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1], client);
        var path = result.path;
        var filename = result.name;
    }

    if(filename){
        try{
            var file = boss.fs.get_file(path, filename);
            file = args[2] ? args[2] : '';
        } catch(err){
            try{
                boss.fs.set_file(path, filename, args[2] ? args[2] : '', client.user);
            } catch(err){
                boss.lib.print.error('error : ' + err, client);
            }
        }
    } else if(!filename) {
        boss.lib.print.error('error: no file argument', client);
    }
});