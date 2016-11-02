(function(args, client){
    if(args.length > 1){
        var result = boss.lib.utils.splitPathFilename(args[1]);
        var path = result.path;var filename = result.name;
    }
    
    if(filename){
        try{
            boss.fs.get_file(path,filename).data = args[2] ? args[2] : '';
        } catch(err){
            try{
                boss.fs.set_file(path,filename, new boss.fs.File(boss.fs.get_current_username,args[2] ? args[2] : ''));
            } catch(err){
                boss.lib.print.error('error : ' + err, client);
            }
        }
        
        boss.fs.save();
    } else if(!filename) {
        boss.lib.print.error('error: no file argument', client); 
    }
})