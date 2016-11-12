'use strict'

function Boss(root, name){

    var boss = this;

    var loadFileSystem = root => {
        this.FileSystem = eval(root.dirs.sys.dirs.FileSystem.dirs.src.files['index.js'].data);
    }

    var loadJS = (folder, name) => {
        var dirs = this.fs.get_dirs('/' + folder);
        for(var dir in dirs){
            var code = this.fs.get_file('/' + folder + '/' + dirs[dir]  + '/src', 'index.js');
            this[name][dirs[dir]] = eval(code);
         }
    }

    var loadLibraries = () => {loadJS('lib', 'lib');}
    var loadCommands = () => {loadJS('bin', 'cmd');}
    var loadApps = () => {loadJS('app', 'app');}
    var runInit = () => {
        var files = this.fs.get_files('/etc');
        for(var file in files){
            var code = this.fs.get_file('/etc',files[file]);
            var fn = eval(code);
            fn();
        }
    }

    this.reload = function(){
        this.cmd, this.lib, this.app = {};
        loadLibraries();
        loadCommands();
        loadApps(); //Should this be at runtime?
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

