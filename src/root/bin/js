(function(args, client){
    
    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1]);
        var path = result.path;
        var name = result.name;
    }if(name){
        try{
            boss.lib.print.log(eval(boss.fs.get_file(path,name).data), client);
        } catch(err){
            boss.lib.print.error('error : ' + err, client);
        }
    } else if(!name) {
        boss.lib.print.error('error: no file argument', client); 
    }
})