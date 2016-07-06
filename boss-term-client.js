'use strict'

function BossTermClient(b){

    var boss = b;
    var terminal;

    this.toolbar = {
        set_title: function(title){
            console.log('set title');
            $('#toolbar-title').text(title);
        }
    }

    this.out = function(text){
        terminal.echo(text);
    }

    this.set_prompt = function(prompt){
        terminal.set_prompt(prompt);
    }

    this.exec = (command, term) => {
        terminal = term;
        boss.interpreters[boss.interpreters.length - 1](command, this);
    }
}