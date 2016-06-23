'use strict'

function Boss(root){

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

    this.fs = new FileSystem(root);
    this.cmd = {};
    loadLibraries(this.fs);
    loadCommands(this.fs);
    this.login = new this.Login(this);
    this.shell = new this.Shell(this);
} 
        
//CLASSES
function Dir(name, owner, parent){
    this.name = name;
    this.owner = owner;
    this.parent = parent
    this.created = Date.now();
    this.dirs = {};
    this.files = {};
}

function File(owner, data, meta){
    this.owner = owner;
    this.created = Date.now();
    this.data = data;
    this.meta = meta;
}

function User(username, type, password){
    this.username = username;
    this.type = type;
    this.password = password;
}

function FileSystem(r){
    var root;
    var cwd;
    var user;

    var get_dir = path => {
        var parts = path.split('/');
        var directory = root;
        for(var i = 1; i < parts.length; i++){
            if(parts[i] !== ''){
                directory = directory.dirs[parts[i]];
            }
        }
        return directory;
    }
    
    this.get_cwd = () => {
        return cwd;
    }

    this.set_cwd = (path) => {
        if(get_dir(path)){
            cwd = path;
        } else{
            throw 'dir does not exist';
        }
    }

    this.get_file = function(path, filename){
        if(get_dir(path).files[filename]){
            return get_dir(path).files[filename];
        } else {
            throw 'file does not exist';
        }
    }

    this.set_file = function(path, filename, file){
        get_dir(path).files[filename] = file;
    }

    //add directroy
    this.add_dir = (path,dir) => { 
        if(!get_dir(path).dirs[dir.name]){
            get_dir(path).dirs[dir.name] = dir;
        } else {
            throw 'dir already exists';
        }
    }

    //remove file or dir
    this.remove = (path, name, type) => {
        if(type === 'file' && get_dir(path).files[name]){
            delete get_dir(path).files[name];
        } else if( type === 'dir' && get_dir(path).dirs[name] ){
            delete get_dir(path).dirs[name];
        } else {
            throw 'error : does not exist';
        }
    }

    //get directory and file listing
    this.get_contents = path => {
        var directory = get_dir(path);
        var dirs = directory.dirs;
        var files = directory.files;
        return Object.keys(dirs).concat(Object.keys(files));
    }

    //get file listing
    this.get_files = path => {
        var directory = get_dir(path);
        var files = directory.files;
        return Object.keys(files);
    }

     //get dir listing
    this.get_dirs = path => {
        var directory = get_dir(path);
        var dirs = directory.dirs;
        return Object.keys(dirs);
    }

    //User stuff
    this.add_user = (key, user) => { 
        root.users[key] = user;
        var homeDir = new Dir(key, key, 'home');
        homeDir.dirs = {
            'Documents' : new Dir('Documents', key, 'home/' + key),
            'Downloads' : new Dir('Downloads', key, 'home/' + key),
            'Email' : new Dir('Email', key, 'home/' + key),
            'Images' : new Dir('Images', key, 'home/' + key)
        }
        this.add_dir('/home', homeDir); 
    }
    this.get_user = (key) => { return root.users[key] }
    this.set_current_user = u => { user = u } 
    this.get_current_username = () => { return user.username }
    this.get_current_user_type = () => { return user.type }

    //return root
    this.export = () => {
        return root;
    }
    //save to localStorage
    this.save =  () => {
        localStorage.setItem('fs', JSON.stringify(root));
    }

    this.utils = {
        calcAbsPath : (arg, args) => {
            var path = this.get_cwd();
            if(arg && arg.startsWith('/')){
                path = arg;
            } else if(arg && arg.startsWith('~')){
                path = '/home/' + this.get_current_username() + arg.slice(1);
            } else if(arg && arg === '..'){
                var parts = path.split('/');
                parts = parts.slice(0, parts.length - 1);
                path = parts.join('/');
            } else if(args && args.length >= 2 && args[1]){
                path += '/' + arg;
            } else if(!args){
                path += '/' + arg;
            }
            return path;
        },
        splitPathFilename : full => {
            var path = this.get_cwd();
            var name = full;
            var parts = full.split('/');
                    
            if(parts.length > 1){
                name = parts.pop();
                path = this.utils.calcAbsPath(parts.join('/'));
            }
            return {
                path: path,
                name: name
            }
        }
    }

    root = r;
}

