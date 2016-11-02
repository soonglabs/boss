(function(args, client){
    if(args.length < 4){
        boss.lib.print.error('error: not enough arguments', client);
    } else if( args[2] !== 'root' && args[2] !== 'user') {
        boss.lib.print.error('error : invalid type ' + args[2], client);
    } else {
        boss.fs.add_user(args[1], new boss.fs.User(args[1], args[2], boss.lib.utils.hashCode(args[3])));
        boss.fs.save();
    }
})