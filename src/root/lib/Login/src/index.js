(function(boss){
    
    var username = false;
    
    this.username = (command, client) => {
        
        if(!boss.fs.get_user(command)) {
            boss.lib.print.error('unknown user', client);
        } else if(boss.fs.get_user(command).password){
            boss.lib.set_prompt('password', client);
            username = command;
            boss.lib.push(this.password);
        }
    }
    
    this.password = (command, client) => {
        
        if(boss.fs.get_user(username).password == boss.lib.utils.hashCode(command)){
            boss.fs.set_current_user(username);
            boss.lib.set_prompt( username, client);
            boss.fs.set_cwd('/home/' + username);
            boss.lib.pop();
            boss.lib.push(new boss.lib.Shell(boss).exec);
            boss.cmd.about('', client);
            boss.lib.print.log('Hello ' + username + '. Welcome to BOSS. Type [[;orange;]help] to see available commands.', client);
        } else {
            boss.lib.print.error('unknown username/password combination', client);
            boss.lib.set_prompt('username', client);
            boss.lib.pop();
        }
    }
})