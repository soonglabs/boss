(function(args, client){

    var Chatter = function(nameFrom, nameTo, settings){
        this.from = nameFrom;
        this.to = nameTo;
        var colorMap = {};
        colorMap[nameFrom] = settings.from_color;
        colorMap[nameTo] = settings.to_color;

        //get chat history and print
        var chatHistory = '';
        var chatHistoryFileName = nameFrom + '-' + nameTo + '.json';
        var chats = [];
        try{
            chatHistory = boss.fs.get_file('/var/chat', nameFrom + '-' + nameTo + '.json');
            var chats = JSON.parse(chatHistory);
            chats.forEach(function(chat){
                boss.lib.print.log("[[;" + colorMap[chat.name] + ";]" + chat.name + ">] " + chat.message, client);
            });
        } catch (err){
            try{
                chatHistory = boss.fs.get_file('/var/chat', nameTo + '-' + nameFrom + '.json');
                chatHistoryFileName = nameTo + '-' + nameFrom + '.json';
                 var chats = JSON.parse(chatHistory);
                chats.forEach(function(chat){
                    boss.lib.print.log("[[;" + colorMap[chat.name] + ";]" + chat.name + ">] " + chat.message, client);
                });
            } catch( err) {
                //couldn't find file so do nothing
            }
        }

        //create listener to get new chats
        var listener = function(chat){
            chats.push(chat);
            boss.lib.print.log("[[;" + colorMap[chat.name] + ";]" + chat.name + ">] " + chat.message, client);
            client.flush();
        };
        boss.lib.event.subscribe('chat-' + nameFrom + '-' + nameTo, 'chat-listener', listener);

        //instnace methods
        this.sendMessage = (chat) => {
            boss.lib.event.send('chat-' + nameFrom + '-' + nameTo, {
                name: this.from,
                message: chat
            });
        };

        this.destroy = (chat) => {
            boss.fs.set_file('/var/chat', chatHistoryFileName, JSON.stringify(chats), client.user);
            boss.lib.event.unsubscribe('chat-' + nameFrom + '-' + nameTo, 'chat-listener');
        };
    };

     if(args.length < 2){
        boss.lib.print.error('Who are you trying to chat with?', client);
        return;
    }

    var settings = JSON.parse(boss.fs.get_file('/var/chat', 'settings.json'));

    var origPrompt = client.get_prompt();
    client.set_prompt("[[;" + settings.from_color + ";]" + client.user.username + '>] ');
    var chatter = new Chatter(client.user.username, args[1], settings);

    client.push(function(command) {
        if(command === '//quit'){
            //stop listening to this chat
            chatter.destroy();
            client.set_prompt(origPrompt);
           client.pop();
        } else {
            //write to file and send event
            //remove the last line
            client.update(-1, '');
            chatter.sendMessage(command);
        }
    });
});