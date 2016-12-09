(function(args, client){

    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1], client);
        var path = result.path;
        var objectName = result.name;
    }

    if(args.length > 2){
        var result2 = boss.lib.utils.splitPathFilename(args[2], client);
        var path2 = result2.path;
        var objectName2 = result2.name;
    }

    if(objectName && boss.fs.get_files(path).indexOf(objectName) >= 0){
        try{
            var data = boss.fs.get_file(path, objectName);
            boss.fs.set_file(path2, objectName2, data, client.user);
            boss.fs.remove(path, objectName, 'file', client.user);
        } catch(err){
                boss.lib.print.error('error : ' + err, client);
        }
    } else if(objectName && boss.fs.get_dirs(path).indexOf(objectName) >= 0){
        try{
            boss.fs.copy_dir(path, objectName, path2, objectName2, client.user);
            boss.fs.remove(path, objectName, 'dir', client.user);
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    } else if(!objectName) {
        boss.lib.print.error('error: no object argument', client);
    }
});