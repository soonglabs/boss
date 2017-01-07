'use strict'

function Boss(root, name, env){

    var boss = this;

    var loadFileSystem = root => {
        this.FileSystem = eval(root.dirs.sys.files['FileSystem.js'].data);
    }

    var loadJS = (folder, name) => {
        var dirs = this.fs.get_dirs('/' + folder);
        for(var dir in dirs){
            var code = this.fs.get_file('/' + folder + '/' + dirs[dir], dirs[dir] + '.js');
            try{
                this[name][dirs[dir]] = eval(code);
            } catch(err){
                console.log(err);
            }
         }
    }

    var loadLibraries = () => {
        loadJS('lib', 'lib');
    }

    var loadCommands = () => {
        loadJS('cmd', 'cmd');
    }

    var loadApps = () => {
        loadJS('app', 'app');
    }

    var runInit = () => {
        var files = this.fs.get_files('/etc');
        for(var file in files){
            var code = this.fs.get_file('/etc', files[file]);
            var fn = eval(code);
            fn();
        }
    }

    this.reload = function(){
        this.cmd = {};
        this.lib = {};
        this.app = {};
        loadLibraries();
        loadCommands();
        loadApps(); //Should this be at runtime?
        runInit();
    }

    loadFileSystem(root);
    this.fs = new this.FileSystem(root, name, env);
    this.reload();
}

try{
    module.exports = Boss;
} catch(err){
    //do nothing, assuming the file is being run in a browser
}

