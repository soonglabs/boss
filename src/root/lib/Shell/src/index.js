(function(boss){

    this.exec = (command, client) => {
        if (command !== '') {
            var args = command.split(' ');
            if(boss.cmd[args[0]]){
                boss.cmd[args[0]](args, client);
            } else if(args[0] != undefined) {
                boss.lib.print.error('unknown command : ' + command, client);
            }
        }
    };
});