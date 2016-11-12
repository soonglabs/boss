'use strict'

function Boss(root, name){

    var boss = this;

    var loadFileSystem = root => {
        this.FileSystem = eval(root.dirs.sys.dirs.FileSystem.dirs.src.files['index.js'].data);
    }

    var loadLibraries = fs => {
        var dirs = this.fs.get_dirs('/lib');
        for(var dir in dirs){
            var code = this.fs.get_file('/lib/' + dirs[dir]  + '/src', 'index.js');
            this.lib[dirs[dir]] = eval(code);
         }
    }

    var loadCommands = fs => {
        var dirs = this.fs.get_dirs('/bin');
        for(var dir in dirs){
            var code = this.fs.get_file('/bin/' + dirs[dir] + '/src', 'index.js');
            this.cmd[dirs[dir]] = eval(code);
        }
    }

    var loadApps = fs => {
        var dirs = this.fs.get_dirs('/app');
        for(var dir in dirs){
            var code = this.fs.get_file('/app/' + dirs[dir] + '/src', 'index.js');
            this.app[dirs[dir]] = eval(code);
        }
    }

    var runInit = fs => {
        var files = this.fs.get_files('/etc');
        for(var file in files){
            var code = this.fs.get_file('/etc',files[file]);
            var fn = eval(code);
            fn();
        }
    }

    this.reload = function(){
        this.cmd = {};
        this.lib = {};
        this.app = {};
        loadLibraries(this.fs);
        loadCommands(this.fs);
        loadApps(this.fs); //Should this be at runtime?
        runInit();
    }

    loadFileSystem(root);
    this.fs = new this.FileSystem(root, name);
    this.reload();
    this.interpreters = [new this.lib.Login(this).username];
}

try{
    module.exports = Boss;
} catch(err){
    //do nothing, assuming the file is being run in a browser
}

