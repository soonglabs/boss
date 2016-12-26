(function(boss){
    'use strict';
    var terminal;

    this.interpreters = [];

    this.push = function(fn){
        this.interpreters.push(fn);
    };

    this.pop = function(){
        this.interpreters.pop();
    };

    this.text = null;

    this.out = (text) => {
       this.text = this.text ? this.text + "\n" + text : text;
    };

    this.flush = () => {
        terminal.echo(this.text);
        this.clear();
    };

    this.clear = () => {
        this.text = null;
    };

    this.set_prompt = function(prompt){
        terminal.set_prompt(prompt);
    };

    this.get_prompt = function(prompt){
        return terminal.get_prompt();
    };

    this.set_mask = function(boolOrChar){
        terminal.set_mask(boolOrChar);
    };

    this.update = function(line, text){
        terminal.update(line, text);
    };

    this.exec = (command, term) => {
        terminal = term;
        this.interpreters[this.interpreters.length - 1](command, this);
    };
});