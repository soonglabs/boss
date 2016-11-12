(function(boss){
    'use strict'
    var daBoss = boss;
    var terminal;

        this.out = function(text){
            terminal.echo(text);
        }

        this.set_prompt = function(prompt){
            terminal.set_prompt(daBoss.fs.name + ': ' + prompt + '$ ');
        }

        this.get_prompt = function(prompt){
            return terminal.get_prompt();
        }

        this.exec = (command, term) => {
            terminal = term;
            daBoss.interpreters[daBoss.interpreters.length - 1](command, this);
        }
})