(function(args, client){
    'use strict';
    var str = '';
    var path = boss.lib.utils.calcAbsPath(args[1], args, client);
    var list = boss.fs.get_contents(path);
    for(var i in list){
        str += list[i] + '\n';
    }
    str = str.substring(0, str.length-1);
    boss.lib.print.log(str, client);
});