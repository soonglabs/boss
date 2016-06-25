'use strict'

function Boss(root){

    var loadFileSystem = root => {
        this.FileSystem = eval(root.dirs.sys.files.FileSystem.data);
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
        this.cmd['help'] = function(args){
            boss.print.log('\n');
            for(var opt in help){
                boss.print.log(help[opt]);
            }
            boss.print.log('\n');
        }
    }

    var loadLibraries = fs => {
        var files = this.fs.get_files('/lib');
        for(var file in files){
            var code = this.fs.get_file('/lib',files[file]).data;
            this[files[file]] = eval(code);
        }
    }

    loadFileSystem(root);
    this.fs = new this.FileSystem(root);
    this.cmd = {};
    loadLibraries(this.fs);
    loadCommands(this.fs);
} 

