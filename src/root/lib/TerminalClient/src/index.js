(function(boss){
    'use strict';
    var daBoss = boss;
    var terminal;

    this.text = null;

    this.out = (text) => {
       this.text = this.text ? this.text + "\n" + text : text;
    };

    this.flush = () => {
        terminal.echo(this.text);
        this.text = null;
    };

    this.set_prompt = function(prompt){
        terminal.set_prompt(daBoss.fs.name + ': ' + prompt + '$ ');
    };

    this.get_prompt = function(prompt){
        return terminal.get_prompt();
    };

    this.set_mask = function(boolOrChar){
        terminal.set_mask(boolOrChar);
    };

    this.exec = (command, term) => {
        terminal = term;
        daBoss.interpreters[daBoss.interpreters.length - 1](command, this);
    };
});