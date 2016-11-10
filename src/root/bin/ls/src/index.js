(function(args, client){
    'use strict';
    var str = '';
    var path = boss.lib.utils.calcAbsPath(args[1],args);
    var list = boss.fs.get_contents(path);
    for(var i in list){
        str += list[i] + '\n';
    }
    str = str.substring(0, str.length-2);
    boss.lib.print.log(str, client);
})