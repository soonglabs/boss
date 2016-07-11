var ConsoleClient = function(b){
    var daBoss = b;

    this.toolbar = {
        set_title: function(title){
            //nothing
        },
         set_message: function(message){
            //nothing
        },
         set_notification: function(app){
            //nothing
        }
    }

    this.out = function(text){
        console.log(text);
    }

    this.set_prompt = function(prompt){
        //Do nothing
    }

    this.get_prompt = function(){
        return '';
    }

    this.exec = (command) => {
        daBoss.interpreters[daBoss.interpreters.length - 1](command, this);
    }
}