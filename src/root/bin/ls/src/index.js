(function(args, client){
    'use strict';
    var str = '';
    var path = boss.lib.utils.calcAbsPath(args[1],args);
    var list = boss.fs.get_contents(path);
    for(var i in list){
        str += list[i] + '\n';
    }
    str.slice(0,-2);
    boss.lib.print.log(String(str), client);
})