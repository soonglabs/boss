(function(args, client){
    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1]);
        var path = result.path;
        var name = result.name;
    }

    if(name){
        try{
            boss.fs.remove(path, name, 'file');
        } catch(err){
            //error('error : ' + err);
        }
        try{boss.fs.remove(path, name, 'dir');
        } catch(err){
            //error('error : ' + err);
        }
    } else if(!name) {
        boss.lib.print.error('error: no file/dir argument', client);
    }
})