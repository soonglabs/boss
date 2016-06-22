'use strict'

function Boss(){

    var Login = function(boss){
        var prompt = 'login: ';
        var password = false;
        var username = false;

        this.exec = (command, term) => {
            boss.term = term;
            
            if(!boss.fs.get_user(command) && !password){
                
                boss.error( 'unknown user');
            } else if(!password && boss.fs.get_user(command).password){
                
                term.set_prompt('password: ');
                username = command;
                password = true;
            } else if(boss.fs.get_user(username).password === command){
                
                password = false;
                term.set_prompt('login: ');
                boss.fs.set_current_user(boss.fs.get_user(username));
                boss.fs.set_cwd('/home/' + username);
                boss.print('Hello ' + username + '. Welcome to BOSS. Type `help` to see available commands.');

                term.push(boss.shell.exec, {
                    'prompt' : boss.fs.get_current_username() + '> '
                });
            } else {
                boss.error('unknown username/password combination');
                password = false;
                term.set_prompt(prompt);
            }
        }
    }

    var Shell = function(boss){
        this.exec = (command, term) => {
            boss.term = term;
            if (command !== '') {
                var result = command;
                var args = command.split(' ');
                if(boss.cmd[args[0]]){
                    boss.cmd[args[0]](args);   
                }
                else if(args[0] != undefined) {
                    boss.error('unknown command : ' + command);
                }
            }
        } 
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
            boss.print('\n');
            for(var opt in help){
                boss.print(help[opt]);
            }
            boss.print('\n');
        }
    }

    var loadLibraries = fs => {
        var files = this.fs.get_files('/lib');
        for(var file in files){
            var code = this.fs.get_file('/lib',files[file]).data;
            this[files[file]] = eval(code);
        }
    }

    //var boss = this;
    var term;
    this.cmd = {};

     //filesystem object
    //in the future we shouldn't expect the fs to be in localstorage
    if(localStorage.fs){
        this.fs = new FileSystem(JSON.parse(localStorage.fs));
    } else {
        this.fs = new FileSystem();
    }

    loadLibraries(this.fs);
    loadCommands(this.fs);
    this.login = new Login(this);
    this.shell = new Shell(this);
}

//CLASSES//

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

    if(r){
        root = r;
    } else {
        root = new Dir('root', 'root', null);
        root.users = {
            'root' : new User('root','root','pass')
        };
        var bin = new Dir('bin', 'root', '');
        
        bin.files['ls'] = new File('root',
                "(function(args){\n"+
                "var str = ' \\n';\n"+
                "var path = boss.fs.utils.calcAbsPath(args[1],args);\n"+
                "var list = boss.fs.get_contents(path);\n"+
                "for( var i in list ){\n"+
                    "str += list[i] + '\\n';\n"+
                "}\n"+
                    "boss.print(String(str));\n"+
                    "boss.print('\\n');\n"+
                "})"
                , {
                    description : 'list files in current dir'
                });

        bin.files['mkdir'] = new File('root',
                "(function(args){\n"+
                "if(args.length > 1){\n"+
                    "var result = boss.fs.utils.splitPathFilename(args[1]);\n"+
                    "var path = result.path;\n"+
                    "var dirname = result.name;\n"+
                "}\n"+
                "if(dirname){\n"+
                    "try{\n"+
                        "boss.fs.add_dir(path, new Dir(dirname, boss.fs.get_current_username(), path));\n"+
                    "} catch(err){\n"+
                        "boss.error('error : ' + err);\n"+
                    "}\n"+
                    "boss.fs.save();\n"+
                "} else if(!dirname) {\n"+
                   "boss.error('error: no dir argument');\n"+
                "}\n"+
                "})", {
                    description : 'create new dir'
                });

        bin.files['read'] = new File('root', 
                "(function(args){\n"+
                "if(args.length > 1){\n"+
                   "var result = boss.fs.utils.splitPathFilename(args[1]);\n"+
                   "var path = result.path;\n"+
                   "var filename = result.name;\n"+
                "}\n"+
                "if(filename){\n"+
                   "try{\n"+
                        "boss.print(boss.fs.get_file(path, filename).data);\n"+
                    "} catch(err){\n"+
                        "boss.error('error : ' + err);\n"+
                    "}\n"+
                "} else if(!filename) {\n"+
                   "boss.error('error: no file argument');\n"+
                "}\n"+
                "})", {
                    description : 'read file'
                });

        bin.files['logout'] = new File('root', "(function(args){\nboss.term.pop();\n})", {
                    description : 'logout'
                });

        bin.files['edit'] = new File('root',  
            "(function(args){"+
                "if(args.length > 1){"+
                    "var result = boss.fs.utils.splitPathFilename(args[1]);"+
                    "var path = result.path;"+
                    "var filename = result.name;"+
                "}"+
                "if(filename){"+
                        "try{"+
                            "boss.fs.get_file(path,filename).data = args[2] ? args[2] : '';"+
                        "} catch(err){"+
                            "try{"+
                                "boss.fs.set_file(path,filename, new File(boss.fs.get_current_username,args[2] ? args[2] : ''));"+
                            "} catch(err){"+
                                "boss.error('error : ' + err);"+
                            "}"+
                        "}"+
                        "boss.fs.save();"+
                "} else if(!filename) {"+
                    "boss.error('error: no file argument'); "+
                "}"+
            "})"
        , {
            description: 'edit file'
        });

        bin.files['cd'] = new File('root', 
            "(function(args){\n"+
                    "if(args[1]){\n"+
                        "try{\n"+
                            "var path = boss.fs.utils.calcAbsPath(args[1]);\n"+
                            "boss.fs.set_cwd(path);\n"+
                            "var list = path.split('/');\n"+
                            "boss.term.set_prompt((list.length <= 1 ? 'root' : list[list.length - 1]) + '> ');\n"+
                        "} catch(err){\n"+
                            "boss.error('error : ' + err);\n"+
                        "}\n"+
                    "} else if(!args[1]){\n"+
                        "boss.error('error: no directory argument');\n"+
                    "}\n"+
            "})"
        , {description:'move to dir'});

        bin.files['cp'] = new File('root', 
            "(function(args){"+
                    "if(args.length > 1){"+
                        "var result = boss.fs.utils.splitPathFilename(args[1]);"+
                        "var path = result.path;"+
                        "var filename = result.name;"+
                    "}"+
                    "if(args.length > 2){"+
                        "var result2 = boss.fs.utils.splitPathFilename(args[2]);"+
                        "var path2 = result2.path;"+
                        "var filename2 = result2.name;"+
                    "}"+
                    "if(filename){"+
                    "try{"+
                            "var file = boss.fs.get_file(path, filename);"+
                            "boss.fs.set_file(path2, filename2, file);"+
                            "boss.fs.save();"+
                        "} catch(err){"+
                            "boss.error('error : ' + err);"+
                        "}"+
                    "} else if(!filename) {"+
                        "boss.error('error: no file argument');" +
                    "}"+
                "})"
        , {
            description: 'copy file'
        });

        bin.files['mv'] = new File('root', 
            "(function(args){"+
                    "if(args.length > 1){"+
                        "var result = boss.fs.utils.splitPathFilename(args[1]);"+
                        "var path = result.path;"+
                        "var filename = result.name;"+
                    "}"+
                    "if(args.length > 2){"+
                        "var result2 = boss.fs.utils.splitPathFilename(args[2]);"+
                        "var path2 = result2.path;"+
                        "var filename2 = result2.name;"+
                    "}"+
                    "if(filename){"+
                    "try{"+
                            "var file = boss.fs.get_file(path, filename);"+
                            "boss.fs.set_file(path2, filename2, file);"+
                            "boss.fs.remove(path, filename, 'file');"+
                            "boss.fs.save();"+
                        "} catch(err){"+
                            "boss.error('error : ' + err);"+
                        "}"+
                    "} else if(!filename) {"+
                        "boss.error('error: no file argument'); "+
                    "}"+
                 "})"
        , { description: 'move file'});

        bin.files['rm'] = new File('root', 
            "(function(args){\n"+
                    "if(args.length > 1){\n"+
                       "var result = boss.fs.utils.splitPathFilename(args[1]);\n"+
                        "var path = result.path;\n"+
                        "var name = result.name;\n"+
                    "}\n"+
                    "if(name){\n"+
                        "try{"+
                            "boss.fs.remove(path, name, 'file');\n"+
                            "boss.fs.save();\n"+
                        "} catch(err){\n"+
                            "//error('error : ' + err);\n"+
                        "}\n"+
                        "try{"+
                            "boss.fs.remove(path, name, 'dir');\n"+
                            "boss.fs.save();\n"+
                        "} catch(err){\n"+
                            "//error('error : ' + err);\n"+
                        "}\n"+
                    "} else if(!name) {\n"+
                        "boss.error('error: no file/dir argument');\n"+
                    "}\n"+
            "})"
        , { description:'remove file or dir'});

        bin.files['js'] = new File('root' , 
         "(function(args){\n"+
              "if(args.length > 1){"+
                        "var result = boss.fs.utils.splitPathFilename(args[1]);"+
                        "var path = result.path;"+
                        "var name = result.name;"+
                    "}"+
                    "if(name){"+
                    "try{"+
                            "boss.print(eval(boss.fs.get_file(path,name).data));"+
                        "} catch(err){"+
                            "boss.error('error : ' + err);"+
                        "}"+
                    "} else if(!name) {"+
                        "boss.error('error: no file argument'); "+
                    "}"+
                "})"
        , { description: 'run js file'});

        bin.files['export'] = new File('root',
            "(function(args){\n"+
                "boss.print(JSON.stringify(boss.fs.export()));\n"+
             "})"
         , {
            description: 'export filesystem'
        });

        bin.files['adduser'] = new File('root', 
         "(function(args){\n"+
                    "if(args.length < 4){"+
                        "boss.error('error: not enough arguments');"+
                    "} else if( args[2] !== 'root' && args[2] !== 'user') {"+
                        "boss.error('error : invalid type ' + args[2]);"+
                    "} else { "+
                        "boss.fs.add_user(args[1], new User(args[1], args[2], args[3]));"+
                        "boss.fs.save();"+
                    "}"+
            "})"
        , { description: 'add new user'});

        bin.files['echo'] = new File('root', "(function(args){boss.print(args[1])})", {
             description : 'echo string to console'
        });

        var lib = new Dir('lib', 'root', '');
        lib.files['print'] = new File('root', "(function(txt){boss.term.echo(txt);})");
        lib.files['error'] = new File('root', "(function(txt){boss.term.echo(txt);})");

        root.dirs = {
            'bin' : bin,
            'etc' : new Dir('etc', 'root', ''),//config files
            'home' : new Dir('home', 'root', ''),//home dirs
            'lib' : lib, //system libraries
            'mnt' : new Dir('mnt', 'root', ''), //mounted directories
            'tmp' : new Dir('tmp' ,'root', ''), //temp files
            'var' : new Dir('var', 'root', ''), //variable file (logs)
        };
        var homeDir = new Dir('root', 'root', 'home');
        homeDir.dirs = {
            'Documents' : new Dir('Documents', 'root', 'home/' + 'root'),
            'Downloads' : new Dir('Downloads', 'root', 'home/' + 'root'),
            'Email' : new Dir('Email', 'root', 'home/' + 'root'),
            'Images' : new Dir('Images', 'root', 'home/' + 'root')
        }
        this.add_dir('/home', homeDir);
    }
}

