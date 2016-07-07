'use strict'

function BossTermClient(b){

    var daBoss = b;
    var terminal;

    this.toolbar = {
        set_title: function(title){
            $('#toolbar-title').html(title);
        },
         set_message: function(message){
            $('#toolbar-message').html(message);
        },
         set_notification: function(app){
            $('#toolbar-notification').html(app);
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
        daBoss.interpreters[boss.interpreters.length - 1](command, this);
    }
}