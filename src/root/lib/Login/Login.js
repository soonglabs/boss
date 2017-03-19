(function(boss){
    'use strict';
    var username = false;

    var login = function(client, user){
        client.user = user;
        client.cwd = '/home/' + username;
        client.set_mask(false);
        boss.lib.set_prompt( username, client);
        client.pop();
        boss.reloadUser(username);
        //register apps with navbar
        boss.lib.navbar.setApps(Object.keys(boss.app));
        client.push(new boss.lib.CommandRunner(boss).exec);
        boss.cmd.about('', client);
        boss.lib.print.log('Hello ' + username + '. Welcome to BOSS. Type [[;orange;]help] to see available commands.', client);
        client.flush();
    }

    this.username = (command, client) => {
        boss.lib.set_prompt('password', client);
        username = command;
        if(username === 'guest'){
            var user = boss.fs.validate_user(username, boss.lib.utils.hashCode('pass'));
            login(client, user);
        } else {
            client.set_mask('*');
            client.push(this.password);
        }
    };

    this.password = (command, client) => {
        var user = boss.fs.validate_user(username, boss.lib.utils.hashCode(command));
        if(user){
            login(client, user);
        } else {
            boss.lib.print.error('unknown username/password combination', client);
            boss.lib.set_prompt('username', client);
            client.set_mask(false);
            client.pop();
        }
        client.flush();
    };
});