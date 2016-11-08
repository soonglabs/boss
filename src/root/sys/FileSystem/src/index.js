(function FileSystem(r, name){

    this.name = name;
    r.users = JSON.parse(r.files['users.json']['data']);
    //VARS
    var root;
    var cwd;
    var user;

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

    var get_dir = (path) => {
        var parts = path.split('/');
        var directory = root;

        for(var i = 1; i < parts.length; i++){
            if(parts[i] !== ''){
                directory = directory.dirs[parts[i]];
            }
        }
        return directory;
    }

    //METHODS
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

    //TODO should return data not file object
    this.get_file = (path, filename) => {
        if(get_dir(path).files[filename]){
            return get_dir(path).files[filename].data;
        } else {
            throw 'file does not exist';
        }
    }



    this.set_file = (path, filename, data) => {
        get_dir(path).files[filename] = new this.File(this.get_current_username, data, null);
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
        var homeDir = new this.Dir(key, key, 'home');
        homeDir.dirs = {
            'Documents' : new this.Dir('Documents', key, 'home/' + key),
            'Downloads' : new this.Dir('Downloads', key, 'home/' + key),
            'Email' : new this.Dir('Email', key, 'home/' + key),
            'Images' : new this.Dir('Images', key, 'home/' + key)
        }

        this.add_dir('/home', homeDir); 
    }

    this.get_user = (key) => { return root.users[key]; }
    this.set_current_user = u => { user = u } 
    this.get_current_username = () => { return user.username }
    this.get_current_user_type = () => { return user.type }

    //return root
    this.export = () => {
        return root;
    }

    root = r;
    //zero out mnt dir
    root.dirs.mnt.dirs = {};
})