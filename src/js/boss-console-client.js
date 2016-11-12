var ConsoleClient = function(b){
    var daBoss = b;

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

try{
    module.exports = ConsoleClient;
} catch(err){
    //do nothing, assuming the file is being run in a browser
}
