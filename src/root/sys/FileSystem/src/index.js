(function FileSystem(root, name){
    'use strict';

    //SYSTEM NAME
    this.name = name;

    //VARS
    var _cwd;
    var _user;
    var _root = root;
    _root.users = JSON.parse(_root.files['users.json'].data);

    //CLASSES
    this.Dir = function(name, owner, parent){
        this.name = name;
        this.owner = owner;
        this.parent = parent;
        this.created = Date.now();
        this.dirs = {};
        this.files = {};
    }

    this.File = function(owner, data, meta){
        this.owner = owner;
        this.created = Date.now();
        this.data = data;
        this.meta = meta;
    }

    this.User = function(username, type, password){
        this.username = username;
        this.type = type;
        this.password = password;
    }

    //FUNCTIONS
    var get_dir = (path) => {
        var parts = path.split('/');
        var directory = _root;

        for(var i = 1; i < parts.length; i++){
            if(parts[i] !== ''){
                directory = directory.dirs[parts[i]];
            }
        }
        return directory;
    }

    var validate = (object) => {
        if(this.get_current_user_type() !== 'root' &&
           this.get_current_username() !== object.owner){
            throw Error('You are not permitted to execute this action');
        }
    };

    //METHODS
    this.get_cwd = () => {
        return _cwd;
    }

    this.set_cwd = (path) => {
        if(get_dir(path)){
            _cwd = path;
        } else{
            throw 'dir does not exist';
        }
    }

    this.get_file = (path, filename) => {
        if(get_dir(path).files[filename]){
            var file = get_dir(path).files[filename];
            validate(file);
            return get_dir(path).files[filename].data;
        } else {
            throw 'file does not exist';
        }
    }

    this.set_file = (path, filename, data) => {
        get_dir(path).files[filename] = new this.File(this.get_current_username, data, null);
    }

    this.set_dir = (path, dirname) => { 
        if(!get_dir(path).dirs[dirname]){
            var dir = get_dir(path);
            dir.dirs[dirname] = new this.Dir(dirname, this.get_current_username(), path);
        } else {
            throw 'dir already exists';
        }
    }

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

    //USER
    this.add_user = (key, user) => {
        _root.users[key] = user;
        this.set_dir('/home', key);
        this.set_dir('/home/' + key, 'Apps');
        this.set_dir('/home/' + key, 'Documents');
        this.set_dir('/home/' + key, 'Downloads');
        this.set_dir('/home/' + key, 'Images');
    }

    this.get_user = (key) => { return _root.users[key]; };
    this.set_current_user = (key) => { _user = _root.users[key]; };
    this.get_current_username = () => { return _user.username };
    this.get_current_user_type = () => { return _user.type };

    //return root
    this.export = () => {
        return _root;
    }
})