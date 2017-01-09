'use strict'

function Boss(root, name, env){

    var boss = this;

    var loadFileSystem = root => {
        this.FileSystem = eval(root.dirs.sys.files['FileSystem.js'].data);
    }

    var loadJS = (directory, name) => {
        var dirs = this.fs.get_dirs('/' + directory);
        for(var dir in dirs){
            var code = this.fs.get_file('/' + directory + '/' + dirs[dir], dirs[dir] + '.js');
            try{
                this[name][dirs[dir]] = eval(code);
            } catch(err){
                console.log(err);
            }
         }
    }

    var runJS = () => {
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
        loadJS('lib', 'lib');
        loadJS('cmd', 'cmd');
        loadJS('app', 'app'); //Should this be at runtime?
        runJS();
    }

    this.reloadUser = function(username){
        console.log('reload user');
        loadJS('home/' + username + '/cmd', 'cmd');
        loadJS('home/' + username + '/app', 'app'); //Should this be at runtime?
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

