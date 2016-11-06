var TestClient = function(b){
    var daBoss = b;

    this.lastLog;

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

    this.out = (text) => {
        this.lastLog = text;
    }

    this.set_prompt = function(prompt){
        //Do nothing
    }

    this.get_prompt = function(){
        return '';
    }

    this.exec = (command) => {
        this.lastLog = '';
        daBoss.interpreters[daBoss.interpreters.length - 1](command, this);
    }
}

try{
    module.exports = TestClient;
} catch(err){
    //do nothing, assuming the file is being run in a browser
}