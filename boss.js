'use strict'

function Boss(root){

    var loadFileSystem = root => {
        this.FileSystem = eval(root.dirs.sys.files.FileSystem.data);
    }

    var loadEnv = fs => {
        var files = this.fs.get_files('/etc');
        for(var file in files){
            var json = this.fs.get_file('/etc',files[file]).data;
            this.env[files[file]] = JSON.parse(json);
        }
    }

    var loadLibraries = fs => {
        var files = this.fs.get_files('/lib');
        for(var file in files){
            var code = this.fs.get_file('/lib',files[file]).data;
            this.lib[files[file]] = eval(code);
        }
    }

    var loadCommands = fs => {
        var help = [];
        var files = this.fs.get_files('/bin');
        for(var file in files){
            var code = this.fs.get_file('/bin',files[file]).data;
            this.cmd[files[file]] = eval(code);
            if(this.fs.get_file('/bin',files[file]).meta && this.fs.get_file('/bin',files[file]).meta.description){
                help.push('\t' + files[file] + ' - ' + this.fs.get_file('/bin',files[file]).meta.description);
            }
        }
        this.cmd['help'] = function(args, client){
            boss.lib.print.log('\n', client);
            for(var opt in help){
                boss.lib.print.log(help[opt], client);
            }
            boss.lib.print.log('\n', client);
        }
    }

    this.reload = function(){
        this.cmd = {};
        this.lib = {};
        this.env = {};
        loadEnv(this.fs);
        loadLibraries(this.fs);
        loadCommands(this.fs);
    }

    loadFileSystem(root);
    this.fs = new this.FileSystem(root);
    this.reload();
    this.interpreters = [new this.lib.Login(this).exec];
} 

var ConsoleClient = function(b){
    var boss = b;

    this.out = function(text){
        console.log(text);
    }

    this.set_prompt = function(prompt){
        //Do nothing
    }

    this.exec = (command) => {
        boss.interpreters[boss.interpreters.length - 1](command, this);
    }
}

