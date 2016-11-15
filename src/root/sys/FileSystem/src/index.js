(function FileSystem(root, name){
    'use strict';

    //SYSTEM NAME
    this.name = name;

    //VARS
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
    };

    this.File = function(owner, data, meta){
        this.owner = owner;
        this.created = Date.now();
        this.data = data;
        this.meta = meta;
    };

    this.User = function(username, type, password){
        this.username = username;
        this.type = type;
        this.password = password;
    };

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

    /**
     * The fileSystem permissions system is very simple.
     * If, you are a root user you can do anything. If you
     * are a regular user you can read all files (it's js so
     * really this can't be hidden so why fake it) but can't
     * write on other users files/dirs
     */
    var validate = (object, user) => {
        if(user.type !== 'root' &&
           user.username !== object.owner &&
           !this.validate_user(user.username, user.password)){
            throw Error('You are not permitted to execute this action');
        }
    };

    //METHODS
    this.get_file = (path, filename) => {
        if(get_dir(path).files[filename]){
            var file = get_dir(path).files[filename];
            return get_dir(path).files[filename].data;
        } else {
            throw 'file does not exist';
        }
    }

    this.set_file = (path, filename, data, user) => {
        var dir = get_dir(path);
        validate(dir, user);
        dir.files[filename] = new this.File(this.get_current_username, data, null);
    }

    this.set_dir = (path, dirname, user) => { 
        if(!get_dir(path).dirs[dirname]){
            var dir = get_dir(path);
            validate(dir, user);
            dir.dirs[dirname] = new this.Dir(dirname, user ? user.username : this.get_current_username(), path);
        } else {
            throw 'dir already exists';
        }
    }

    this.remove = (path, name, type, user) => {
        if(type === 'file' && get_dir(path).files[name]){
            var dir = get_dir(path);
            validate(dir, user);
            delete dir.files[name];
        } else if( type === 'dir' && get_dir(path).dirs[name] ){
            var dir = get_dir(path);
            validate(dir);
            delete dir.dirs[name];
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
        this.set_dir('/home', key, user);
        this.set_dir('/home/' + key, 'Apps', user);
        this.set_dir('/home/' + key, 'Documents', user);
        this.set_dir('/home/' + key, 'Downloads', user);
        this.set_dir('/home/' + key, 'Images', user);
    }

    this.remove_user = (key, user) => {
       //TODO
    }

    this.validate_user = (name, pass) => {
        if(_root.users[name] && _root.users[name].password == pass){
            return _root.users[name];
        }
        return false;
    };

    //return root
    this.export = () => {
        return _root;
    }
})