(function(args, client){

    if(!args[1]){
        boss.lib.print.error('error, please command', client);
    } 

    else if(args[1] === 'create' || args[1] === '-c'){

        if(!args[2]){
            boss.lib.print.error('error, please supply name', client);
            return;
        }
        var image = jQuery.extend(true, {}, boss.fs.export());

        if(!boss.supervisor){
            boss.supervisor = {};
        }

        if(!boss.supervisor.instances){
            boss.supervisor.instances = [];
        }

        boss.supervisor.instances.push(new Boss(image, args[2], 'prod'));
    }

    else if(args[1] === 'ls'){
        if(!boss.supervisor || !boss.supervisor.instances || boss.supervisor.instances.length <= 0){
            return;
        }

        boss.supervisor.instances.forEach(function(b){
            boss.lib.print.log(b.fs.name, client);
        });
    }

    else if(args[1] === 'connect' || args[1] === '-r'){
        if(!args[2]){
            boss.lib.print.error('error, please send name of system to connect to', client);
        }

        var connectBoss;
        boss.supervisor.instances.forEach(function(b){
            if(b.fs.name === args[2]){
                connectBoss = b;
                return;
            }
        });

        var ProxyClient = function(b, client){
            var daBoss = b;
            this.text = null;
            this.out = (text) => {
                client.out(text);
            };
            this.flush = () => {
                client.flush();
                this.text = null;
            };
            this.clear = () => {
                this.text = null;
            };
            this.set_prompt = function(prompt){
                client.set_prompt(prompt);
            };
            this.get_prompt = function(){
                return client.get_prompt();
            };
            this.set_mask = function(boolOrChar){
                client.set_mask(boolOrChar);
            };
            this.exec = (command) => {
                daBoss.interpreters[daBoss.interpreters.length - 1](command, this);
            };
        };

        var connectClient = new ProxyClient(connectBoss, client);
        var origPrompt = client.get_prompt();
        connectClient.set_prompt(connectBoss.fs.name + ': username$ ');

        //connect interpreter
        boss.lib.push(function(command, client){
            if(command === 'disconnect'){
                client.set_prompt(origPrompt);
                boss.lib.pop();
                connectBoss.lib.pop();
            } else {
                connectClient.exec(command, connectClient);
            }
        });
    } else {
        boss.lib.print.error('error, unknown command', client);
    }
});