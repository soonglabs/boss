(function(boss){

    var execute = function(args, command, client){
        if(boss.cmd[args[0]]){
            boss.cmd[args[0]](args, client);
        } else if(args[0] != undefined) {
            boss.lib.print.error('unknown command : ' + command, client);
        }
    };

    var parseCommand = function(args, command, client){
        args.forEach(function(arg, index){
            if(/\(.+\)/.exec(arg)){
                var start = arg.indexOf('(');
                var end = arg.lastIndexOf(')');
                var cmd = [arg.slice(0, start)];
                var newArgs = arg.slice(start + 1, end).split(' ');
                newArgs = parseCommand(newArgs, cmd.join(' '), client);
                cmd = cmd.concat(newArgs);
                execute(cmd, command, client);
                args[index] = client.text;
                client.clear();
            }
        });
        return args;
    };

    this.exec = (command, client) => {
        if (command !== '') {
            var args = command.split(' ');
            args = parseCommand(args, command, client);
            execute(args, command, client);
            client.flush();
        }
    };
});