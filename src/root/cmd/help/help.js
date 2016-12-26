(function(args, client){

    var pad = function (string, pad, char) {
        while(string.length < pad){
            string += char;
        }
        return string;
    };

    boss.lib.print.log("[[;Orange;]Shells Commands:]", client);
    boss.lib.print.log("[[;Yellow;]Navigation:]", client);
    boss.lib.print.log(pad('\tcd ', 15, ' ') + "Change Directory", client);
    boss.lib.print.log(pad('\tcp ', 15, ' ') + "Copy", client);
    boss.lib.print.log(pad('\tmv ', 15, ' ') + "Move", client);
    boss.lib.print.log(pad('\tls ', 15, ' ') + "List", client);
    boss.lib.print.log(pad('\tmkdir ', 15, ' ') + "Make Directory", client);
    boss.lib.print.log(pad('\twrite ', 15, ' ') + "Write to File", client);
    boss.lib.print.log(pad('\tread ', 15, ' ') + "Read File", client);
    boss.lib.print.log(pad('\trm ', 15, ' ') + "Remove", client);

    boss.lib.print.log("[[;Yellow;]User:]", client);
    boss.lib.print.log(pad('\tadduser ', 15, ' ') + 'Create User', client);
    //boss.lib.print.log(pad('\trmuser ', 15, ' ') + 'Remove User', client);

    boss.lib.print.log("[[;Orange;]Apps:]", client);
    boss.lib.print.log("\tshell", client);
    boss.lib.print.log("\tedit", client);
    boss.lib.print.log("\techo", client);
    boss.lib.print.log("\thttp", client);
    boss.lib.print.log("\tjs", client);

    boss.lib.print.log("[[;Orange;]System:]", client);
    boss.lib.print.log("\tabout", client);
    boss.lib.print.log("\texport", client);
    boss.lib.print.log("\texit", client);
    boss.lib.print.log("\thelp", client);
});