(function(args, client){
    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1]);
        var path = result.path;var filename = result.name;
    }
    
    if(args.length > 2){
        var result2 = boss.lib.utils.splitPathFilename(args[2]);
        var path2 = result2.path;var filename2 = result2.name;
        
    }
    
    if(filename){
        try{
            var file = boss.fs.get_file(path, filename);
            boss.fs.set_file(path2, filename2, file);
            boss.fs.save();
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    } else if(!filename) {
        boss.lib.print.error('error: no file argument', client);
    }
})