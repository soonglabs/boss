(function(boss){
    'use strict';
    var username = false;

    this.username = (command, client) => {
        boss.lib.set_prompt('password', client);
        username = command;
        client.set_mask('*');
        boss.lib.push(this.password);
    };

    this.password = (command, client) => {
        var user = boss.fs.validate_user(username, boss.lib.utils.hashCode(command));
        if(user){
            client.user = user;
            client.cwd = '/home/' + username;

            client.set_mask(false);
            boss.lib.set_prompt( username, client);
            boss.lib.pop();
            boss.lib.push(new boss.lib.Shell(boss).exec);
            boss.cmd.about('', client);
            boss.lib.print.log('Hello ' + username + '. Welcome to BOSS. Type [[;orange;]help] to see available commands.', client);
         } else {
            boss.lib.print.error('unknown username/password combination', client);
            boss.lib.set_prompt('username', client);
            client.set_mask(false);
            boss.lib.pop();
        }
    };
});