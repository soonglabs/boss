(function(args, client){

    if(!args[1]){
        boss.lib.print.error('error, please command', client);
    } 

    else if(args[1] === 'create'){

        if(!args[2]){
            boss.lib.print.error('error, please supply name', client);
            return;
        }
        var image = jQuery.extend(true, {}, boss_image);
        new Boss(image, args[2], 'prod');
    }

    else if(args[1] === 'ls'){
        if(!window.instances || window.instances.length <= 0){
            return;
        }

        window.instances.forEach(function(b){
            boss.lib.print.log(b.fs.name, client);
        });
    }

    else if(args[1] === 'connect' || args[1] === '-r'){
        if(!args[2]){
            boss.lib.print.error('error, please send name of system to connect to', client);
        }

        var connectBoss;
        window.instances.forEach(function(b){
            if(b.fs.name === args[2]){
                connectBoss = b;
                return;
            }
        });

        var ProxyClient = function(client){
            this.text = null;

            this.interpreters = [];

            this.push = function(fn){
                this.interpreters.push(fn);
            };

            this.pop = function(){
                this.interpreters.pop();
            };

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
                this.interpreters[this.interpreters.length - 1](command, this);
            };
        };

        var connectClient = new ProxyClient(client);
        connectClient.push(new connectBoss.lib.Login(connectBoss).username);
        var origPrompt = client.get_prompt();
        connectClient.set_prompt(connectBoss.fs.name + ': username$ ');

        //connect interpreter
        client.push(function(command){
            if(command === 'disconnect'){
                client.set_prompt(origPrompt);
                client.pop();
                connectClient.pop();
            } else {
                connectClient.exec(command, connectClient);
            }
        });
    } else {
        boss.lib.print.error('error, unknown command', client);
    }
});