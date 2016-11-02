'use strict'

function Boss(root, name){

    var boss = this;

    var loadFileSystem = root => {
        this.FileSystem = eval(root.dirs.sys.dirs.FileSystem.dirs.src.files['index.js'].data);
    }

    var loadLibraries = fs => {
        var dirs = this.fs.get_dirs('/lib');
        for(var dir in dirs){
            var file = this.fs.get_file('/lib/' + dirs[dir]  + '/src', 'index.js');
            var code = file.data
            this.lib[dirs[dir]] = eval(code);
         }
    }

    var loadCommands = fs => {
        var dirs = this.fs.get_dirs('/bin');
        for(var dir in dirs){
            var files = this.fs.get_files('/bin/' + dirs[dir] + '/bin');
            for(var file in files){
                var code = this.fs.get_file('/bin/' + dirs[dir] + '/bin', files[file]).data;
                this.cmd[dirs[dir]] = eval(code);
                if(this.fs.get_file('/bin/' + dirs[dir] + '/bin',files[file]).meta && this.fs.get_file('/bin/' + dirs[dir] + '/bin',files[file]).meta.description){
                    help.push(files[file] + ' - ' + this.fs.get_file('/bin/' + dirs[dir] + '/bin',files[file]).meta.description);
                }
            }
        }
    }

    var runInit = fs => {
        var files = this.fs.get_files('/etc');
        for(var file in files){
            var code = this.fs.get_file('/etc',files[file]).data;
            var fn = eval(code);
            fn();
        }
    }

    this.reload = function(){
        this.cmd = {};
        this.lib = {};
        loadLibraries(this.fs);
        loadCommands(this.fs);
        runInit();
    }

    loadFileSystem(root);
    this.fs = new this.FileSystem(root, name);
    this.reload();
    this.interpreters = [new this.lib.Login(this).username];
}

