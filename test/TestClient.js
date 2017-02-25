var TestClient = function(){

    this.interpreters = [];

    this.push = function(fn){
        this.interpreters.push(fn);
    };

    this.pop = function(){
        this.interpreters.pop();
    };

    this.text = null;

    this.out = (text) => {
        this.text = text;
    };

     this.flush = () => {
        console.log(this.text);
    };

    this.clear = () => {
        this.text = null;
    };

    this.set_prompt = function(prompt){
        //Do nothing
    };

    this.set_mask = function(boolOrChar){
        //Do nothing
    };

    this.get_prompt = function(){
        return '';
    };

    this.exec = (command) => {
        this.clear();
        this.interpreters[this.interpreters.length - 1](command, this);
    };
};

try {
    module.exports = TestClient;
} catch (err){
    //do nothing, assuming the file is being run in a browser
}