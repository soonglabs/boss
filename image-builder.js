'use strict'
//build default image while developing

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

var DEFAULT_IMAGE = new Dir('root', 'root', null);
        DEFAULT_IMAGE.users = {
            'root' : new User('root','root','pass')
        };
        var bin = new Dir('bin', 'root', '');
        
        bin.files['ls'] = new File('root',
                "(function(args){\n"+
                "var str = ' \\n';\n"+
                "var path = boss.utils.calcAbsPath(args[1],args);\n"+
                "var list = boss.fs.get_contents(path);\n"+
                "for( var i in list ){\n"+
                    "str += list[i] + '\\n';\n"+
                "}\n"+
                    "boss.print.log(String(str));\n"+
                    "boss.print.log('\\n');\n"+
                "})"
                , {
                    description : 'list files in current dir'
                });

        bin.files['mkdir'] = new File('root',
                "(function(args){\n"+
                "if(args.length > 1){\n"+
                    "var result = boss.utils.splitPathFilename(args[1]);\n"+
                    "var path = result.path;\n"+
                    "var dirname = result.name;\n"+
                "}\n"+
                "if(dirname){\n"+
                    "try{\n"+
                        "boss.fs.add_dir(path, new boss.fs.Dir(dirname, boss.fs.get_current_username(), path));\n"+
                    "} catch(err){\n"+
                        "boss.print.error('error : ' + err);\n"+
                    "}\n"+
                    "boss.fs.save();\n"+
                "} else if(!dirname) {\n"+
                   "boss.print.error('error: no dir argument');\n"+
                "}\n"+
                "})", {
                    description : 'create new dir'
                });

        bin.files['read'] = new File('root', 
                "(function(args){\n"+
                "if(args.length > 1){\n"+
                   "var result = boss.utils.splitPathFilename(args[1]);\n"+
                   "var path = result.path;\n"+
                   "var filename = result.name;\n"+
                "}\n"+
                "if(filename){\n"+
                   "try{\n"+
                        "boss.print.log(boss.fs.get_file(path, filename).data);\n"+
                    "} catch(err){\n"+
                        "boss.print.error('error : ' + err);\n"+
                    "}\n"+
                "} else if(!filename) {\n"+
                   "boss.print.error('error: no file argument');\n"+
                "}\n"+
                "})", {
                    description : 'read file'
                });

        bin.files['logout'] = new File('root', "(function(args){\nboss.pop();\n})", {
                    description : 'logout'
                });

        bin.files['edit'] = new File('root',  
            "(function(args){"+
                "if(args.length > 1){"+
                    "var result = boss.utils.splitPathFilename(args[1]);"+
                    "var path = result.path;"+
                    "var filename = result.name;"+
                "}"+
                "if(filename){"+
                        "try{"+
                            "boss.fs.get_file(path,filename).data = args[2] ? args[2] : '';"+
                        "} catch(err){"+
                            "try{"+
                                "boss.fs.set_file(path,filename, new boss.fs.File(boss.fs.get_current_username,args[2] ? args[2] : ''));"+
                            "} catch(err){"+
                                "boss.print.error('error : ' + err);"+
                            "}"+
                        "}"+
                        "boss.fs.save();"+
                "} else if(!filename) {"+
                    "boss.print.error('error: no file argument'); "+
                "}"+
            "})"
        , {
            description: 'edit file'
        });

        bin.files['cd'] = new File('root', 
            "(function(args){\n"+
                    "if(args[1]){\n"+
                        "try{\n"+
                            "var path = boss.utils.calcAbsPath(args[1]);\n"+
                            "boss.fs.set_cwd(path);\n"+
                            "var list = path.split('/');\n"+
                            "boss.set_prompt((list.length <= 1 ? 'root' : list[list.length - 1]) + '> ');\n"+
                        "} catch(err){\n"+
                            "boss.print.error('error : ' + err);\n"+
                        "}\n"+
                    "} else if(!args[1]){\n"+
                        "boss.print.error('error: no directory argument');\n"+
                    "}\n"+
            "})"
        , {description:'move to dir'});

        bin.files['cp'] = new File('root', 
            "(function(args){"+
                    "if(args.length > 1){"+
                        "var result = boss.utils.splitPathFilename(args[1]);"+
                        "var path = result.path;"+
                        "var filename = result.name;"+
                    "}"+
                    "if(args.length > 2){"+
                        "var result2 = boss.utils.splitPathFilename(args[2]);"+
                        "var path2 = result2.path;"+
                        "var filename2 = result2.name;"+
                    "}"+
                    "if(filename){"+
                    "try{"+
                            "var file = boss.fs.get_file(path, filename);"+
                            "boss.fs.set_file(path2, filename2, file);"+
                            "boss.fs.save();"+
                        "} catch(err){"+
                            "boss.print.error('error : ' + err);"+
                        "}"+
                    "} else if(!filename) {"+
                        "boss.print.error('error: no file argument');" +
                    "}"+
                "})"
        , {
            description: 'copy file'
        });

        bin.files['mv'] = new File('root', 
            "(function(args){"+
                    "if(args.length > 1){"+
                        "var result = boss.utils.splitPathFilename(args[1]);"+
                        "var path = result.path;"+
                        "var filename = result.name;"+
                    "}"+
                    "if(args.length > 2){"+
                        "var result2 = boss.utils.splitPathFilename(args[2]);"+
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
                            "boss.print.error('error : ' + err);"+
                        "}"+
                    "} else if(!filename) {"+
                        "boss.print.error('error: no file argument'); "+
                    "}"+
                 "})"
        , { description: 'move file'});

        bin.files['rm'] = new File('root', 
            "(function(args){\n"+
                    "if(args.length > 1){\n"+
                       "var result = boss.utils.splitPathFilename(args[1]);\n"+
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
                        "boss.print.error('error: no file/dir argument');\n"+
                    "}\n"+
            "})"
        , { description:'remove file or dir'});

        bin.files['js'] = new File('root' , 
         "(function(args){\n"+
              "if(args.length > 1){"+
                        "var result = boss.utils.splitPathFilename(args[1]);"+
                        "var path = result.path;"+
                        "var name = result.name;"+
                    "}"+
                    "if(name){"+
                    "try{"+
                            "boss.print.log(eval(boss.fs.get_file(path,name).data));"+
                        "} catch(err){"+
                            "boss.print.error('error : ' + err);"+
                        "}"+
                    "} else if(!name) {"+
                        "boss.print.error('error: no file argument'); "+
                    "}"+
                "})"
        , { description: 'run js file'});

        bin.files['export'] = new File('root',
            "(function(args){\n"+
                "boss.print.log(JSON.stringify(boss.fs.export()));\n"+
                "console.log(JSON.stringify(boss.fs.export()));\n"+
             "})"
         , {
            description: 'export filesystem'
        });

        bin.files['adduser'] = new File('root', 
         "(function(args){\n"+
                    "if(args.length < 4){"+
                        "boss.print.error('error: not enough arguments');"+
                    "} else if( args[2] !== 'root' && args[2] !== 'user') {"+
                        "boss.print.error('error : invalid type ' + args[2]);"+
                    "} else { "+
                        "boss.fs.add_user(args[1], new boss.fs.User(args[1], args[2], args[3]));"+
                        "boss.fs.save();"+
                    "}"+
            "})"
        , { description: 'add new user'});

        bin.files['echo'] = new File('root', "(function(args){boss.print.log(args[1])})", {
             description : 'echo string to console'
        });

        bin.files['inspect'] = new File('root', "(function(args){console.log(boss)})", {
             description : 'log boss object for inspection'
        });

        bin.files['test'] = new File('root', "(function(args){boss.print.log('test ls');boss.cmd.ls(args);})", {
             description : 'test fn. Calls ls'
        });

        var lib = new Dir('lib', 'root', '');
        lib.files['print'] = new File('root', "({\n"+
            "'log':function(txt){boss.term.echo(txt)},\n"+
            "'error':function(txt){boss.term.echo(txt)}\n"+
        "})");
        lib.files['set_prompt'] = new File('root', "(function(txt){boss.term.set_prompt(txt)})");
        lib.files['push'] = new File('root', "(function(intp, opts){boss.term.push(intp, opts)})");
        lib.files['pop'] = new File('root', "(function(){boss.term.pop()})");
        lib.files['utils'] = new File('root', 
            "({\n"+
                "calcAbsPath : (arg, args) => {\n"+
                    "var path = boss.fs.get_cwd();\n"+
                    "if(arg && arg.startsWith('/')){\n"+
                        "path = arg;\n"+
                    "} else if(arg && arg.startsWith('~')){\n"+
                        "path = '/home/' + boss.fs.get_current_username() + arg.slice(1);\n"+
                    "} else if(arg && arg === '..'){\n"+
                        "var parts = path.split('/');\n"+
                        "parts = parts.slice(0, parts.length - 1);\n"+
                        "path = parts.join('/');\n"+
                    "} else if(args && args.length >= 2 && args[1]){\n"+
                        "path += '/' + arg;\n"+
                    "} else if(!args){\n"+
                        "path += '/' + arg;\n"+
                    "}\n"+
                    "return path;\n"+
                "},\n"+
                "splitPathFilename : full => {\n"+
                    "var path = boss.fs.get_cwd();\n"+
                    "var name = full;\n"+
                    "var parts = full.split('/');\n"+
                    "if(parts.length > 1){\n"+
                        "name = parts.pop();\n"+
                        "path = boss.utils.calcAbsPath(parts.join('/'));\n"+
                    "}\n"+
                    "return {\n"+
                        "path: path,\n"+
                        "name: name\n"+
                    "}\n"+
                "}\n"+
            "})\n"      
        );
        
        lib.files['Shell'] = new File('root', 
            "(function(boss){"+
                "this.exec = (command, term) => {"+
                    "boss.term = term;"+
                    "if (command !== '') {"+
                        "var result = command;"+
                        "var args = command.split(' ');"+
                        "if(boss.cmd[args[0]]){"+
                            "boss.cmd[args[0]](args);   "+
                        "}"+
                        "else if(args[0] != undefined) {"+
                            "boss.print.error('unknown command : ' + command);"+
                        "}"+
                    "}"+
                "} "+
            "})"
        );
        lib.files['Login'] = new File('root', 
            "(function(boss){\n"+
                "var prompt = 'login: ';\n"+
                "var password = false;\n"+
                "var username = false;\n"+

                "this.exec = (command, term) => {\n"+
                    "boss.term = term;\n"+
                    
                    "if(!boss.fs.get_user(command) && !password){\n"+
                        "boss.print.error( 'unknown user');\n"+
                    "} else if(!password && boss.fs.get_user(command).password){\n"+
                        "boss.set_prompt('password: ');\n"+
                        "username = command;\n"+
                        "password = true;\n"+
                    "} else if(boss.fs.get_user(username).password === command){\n"+
                        "password = false;\n"+
                        "boss.set_prompt('login: ');\n"+
                        "boss.fs.set_current_user(boss.fs.get_user(username));\n"+
                        "boss.fs.set_cwd('/home/' + username);\n"+
                        "boss.print.log('Hello ' + username + '. Welcome to BOSS. Type `help` to see available commands.');\n"+
                        "//var shell = new boss.Shell(boss)\n"+
                        "boss.push(new boss.Shell(boss).exec, {\n"+
                            "'prompt' : boss.fs.get_current_username() + '> '\n"+
                        "});\n"+
                    "} else {\n"+
                        "boss.print.error('unknown username/password combination');\n"+
                        "password = false;\n"+
                        "boss.set_prompt(prompt);\n"+
                    "}\n"+
                "}\n"+
            "})"
        );

        var sys = new Dir('sys', 'root', '');
        sys.files['FileSystem'] = new File('root', 
            "(function FileSystem(r){\n"+
                "//VARS\n"+
                "var root;\n"+
                "var cwd;\n"+
                "var user;\n"+
                "//CLASSES\n"+
                "this.Dir = function(name, owner, parent){\n"+
                    "this.name = name;\n"+
                    "this.owner = owner;\n"+
                    "this.parent = parent\n"+
                    "this.created = Date.now();\n"+
                    "this.dirs = {};\n"+
                    "this.files = {};\n"+
                "}\n"+
                "this.File = function(owner, data, meta){\n"+
                    "this.owner = owner;\n"+
                    "this.created = Date.now();\n"+
                    "this.data = data;\n"+
                    "this.meta = meta;\n"+
                "}\n"+
                "this.User = function(username, type, password){\n"+
                    "this.username = username;\n"+
                    "this.type = type;\n"+
                    "this.password = password;\n"+
                "}\n"+
                "var get_dir = path => {\n"+
                    "var parts = path.split('/');\n"+
                    "var directory = root;\n"+
                    "for(var i = 1; i < parts.length; i++){\n"+
                        "if(parts[i] !== ''){\n"+
                           "directory = directory.dirs[parts[i]];\n"+
                        "}\n"+
                    "}\n"+
                    "return directory;\n"+
                "}\n"+
                "//METHODS\n"+
                "this.get_cwd = () => {\n"+
                    "return cwd;\n"+
                "}\n"+
                "this.set_cwd = (path) => {\n"+
                    "if(get_dir(path)){\n"+
                        "cwd = path;\n"+
                    "} else{\n"+
                        "throw 'dir does not exist';\n"+
                    "}\n"+
                "}\n"+
                "this.get_file = function(path, filename){\n"+
                    "if(get_dir(path).files[filename]){\n"+
                        "return get_dir(path).files[filename];\n"+
                    "} else {\n"+
                        "throw 'file does not exist';\n"+
                    "}\n"+
                "}\n"+
                "this.set_file = function(path, filename, file){\n"+
                    "get_dir(path).files[filename] = file;\n"+
                "}\n"+
                "//add directroy\n"+
                "this.add_dir = (path,dir) => { \n"+
                    "if(!get_dir(path).dirs[dir.name]){\n"+
                        "get_dir(path).dirs[dir.name] = dir;\n"+
                    "} else {\n"+
                        "throw 'dir already exists';\n"+
                    "}\n"+
                "}\n"+
                "//remove file or dir\n"+
                "this.remove = (path, name, type) => {\n"+
                    "if(type === 'file' && get_dir(path).files[name]){\n"+
                        "delete get_dir(path).files[name];\n"+
                    "} else if( type === 'dir' && get_dir(path).dirs[name] ){\n"+
                        "delete get_dir(path).dirs[name];\n"+
                    "} else {\n"+
                        "throw 'error : does not exist';\n"+
                    "}\n"+
                "}\n"+
                "//get directory and file listing\n"+
                "this.get_contents = path => {\n"+
                    "var directory = get_dir(path);\n"+
                    "var dirs = directory.dirs;\n"+
                    "var files = directory.files;\n"+
                    "return Object.keys(dirs).concat(Object.keys(files));\n"+
                "}\n"+
                "//get file listing\n"+
                "this.get_files = path => {\n"+
                    "var directory = get_dir(path);\n"+
                    "var files = directory.files;\n"+
                    "return Object.keys(files);\n"+
                "}\n"+
                "//get dir listing\n"+
                "this.get_dirs = path => {\n"+
                    "var directory = get_dir(path);\n"+
                    "var dirs = directory.dirs;\n"+
                    "return Object.keys(dirs);\n"+
                "}\n"+
                "//User stuff\n"+
                "this.add_user = (key, user) => { \n"+
                    "root.users[key] = user;\n"+
                    "var homeDir = new this.Dir(key, key, 'home');\n"+
                    "homeDir.dirs = {\n"+
                        "'Documents' : new this.Dir('Documents', key, 'home/' + key),\n"+
                        "'Downloads' : new this.Dir('Downloads', key, 'home/' + key),\n"+
                        "'Email' : new this.Dir('Email', key, 'home/' + key),\n"+
                        "'Images' : new this.Dir('Images', key, 'home/' + key)\n"+
                    "}\n"+
                    "this.add_dir('/home', homeDir); \n"+
                "}\n"+
                "this.get_user = (key) => { return root.users[key] }\n"+
                "this.set_current_user = u => { user = u } \n"+
                "this.get_current_username = () => { return user.username }\n"+
                "this.get_current_user_type = () => { return user.type }\n"+

                "//return root\n"+
                "this.export = () => {\n"+
                    "return root;\n"+
                "}\n"+
                "//save to localStorage\n"+
                "this.save =  () => {\n"+
                    "localStorage.setItem('fs', JSON.stringify(root));\n"+
                "}\n"+
                "root = r;\n"+
            "})"
        );

        //conf files
        var etc = new Dir('etc', 'root', '');
        
        var homeRoot = new Dir('root', 'root', 'home');
        homeRoot.dirs = {
            'Documents' : new Dir('Documents', 'root', 'home/' + 'root'),
            'Downloads' : new Dir('Downloads', 'root', 'home/' + 'root'),
            'Email' : new Dir('Email', 'root', 'home/' + 'root'),
            'Images' : new Dir('Images', 'root', 'home/' + 'root')
        }
        
        var home = new Dir('root', 'root', 'root');
        home.dirs = {
            'root': homeRoot
        }
        
        DEFAULT_IMAGE.dirs = {
            'bin' : bin,
            'etc' : etc,//config files
            'home' : home,//home dirs
            'lib' : lib, //system libraries
            'mnt' : new Dir('mnt', 'root', ''), //mounted directories
            'tmp' : new Dir('tmp' ,'root', ''), //temp files
            'var' : new Dir('var', 'root', ''), //variable file (logs)
            'sys' : sys  //filesystem
        };


var JSON_IMAGE = {"name":"root","owner":"root","parent":null,"created":1466800151828,"dirs":{"bin":{"name":"bin","owner":"root","parent":"","created":1466800151828,"dirs":{},"files":{"ls":{"owner":"root","created":1466800151828,"data":"(function(args){\nvar str = ' \\n';\nvar path = boss.utils.calcAbsPath(args[1],args);\nvar list = boss.fs.get_contents(path);\nfor( var i in list ){\nstr += list[i] + '\\n';\n}\nboss.print.log(String(str));\nboss.print.log('\\n');\n})","meta":{"description":"list files in current dir"}},"mkdir":{"owner":"root","created":1466800151828,"data":"(function(args){\nif(args.length > 1){\nvar result = boss.utils.splitPathFilename(args[1]);\nvar path = result.path;\nvar dirname = result.name;\n}\nif(dirname){\ntry{\nboss.fs.add_dir(path, new boss.fs.Dir(dirname, boss.fs.get_current_username(), path));\n} catch(err){\nboss.print.error('error : ' + err);\n}\nboss.fs.save();\n} else if(!dirname) {\nboss.print.error('error: no dir argument');\n}\n})","meta":{"description":"create new dir"}},"read":{"owner":"root","created":1466800151828,"data":"(function(args){\nif(args.length > 1){\nvar result = boss.utils.splitPathFilename(args[1]);\nvar path = result.path;\nvar filename = result.name;\n}\nif(filename){\ntry{\nboss.print.log(boss.fs.get_file(path, filename).data);\n} catch(err){\nboss.print.error('error : ' + err);\n}\n} else if(!filename) {\nboss.print.error('error: no file argument');\n}\n})","meta":{"description":"read file"}},"logout":{"owner":"root","created":1466800151828,"data":"(function(args){\nboss.pop();\n})","meta":{"description":"logout"}},"edit":{"owner":"root","created":1466800151828,"data":"(function(args){if(args.length > 1){var result = boss.utils.splitPathFilename(args[1]);var path = result.path;var filename = result.name;}if(filename){try{boss.fs.get_file(path,filename).data = args[2] ? args[2] : '';} catch(err){try{boss.fs.set_file(path,filename, new boss.fs.File(boss.fs.get_current_username,args[2] ? args[2] : ''));} catch(err){boss.print.error('error : ' + err);}}boss.fs.save();} else if(!filename) {boss.print.error('error: no file argument'); }})","meta":{"description":"edit file"}},"cd":{"owner":"root","created":1466800151828,"data":"(function(args){\nif(args[1]){\ntry{\nvar path = boss.utils.calcAbsPath(args[1]);\nboss.fs.set_cwd(path);\nvar list = path.split('/');\nboss.set_prompt((list.length <= 1 ? 'root' : list[list.length - 1]) + '> ');\n} catch(err){\nboss.print.error('error : ' + err);\n}\n} else if(!args[1]){\nboss.print.error('error: no directory argument');\n}\n})","meta":{"description":"move to dir"}},"cp":{"owner":"root","created":1466800151828,"data":"(function(args){if(args.length > 1){var result = boss.utils.splitPathFilename(args[1]);var path = result.path;var filename = result.name;}if(args.length > 2){var result2 = boss.utils.splitPathFilename(args[2]);var path2 = result2.path;var filename2 = result2.name;}if(filename){try{var file = boss.fs.get_file(path, filename);boss.fs.set_file(path2, filename2, file);boss.fs.save();} catch(err){boss.print.error('error : ' + err);}} else if(!filename) {boss.print.error('error: no file argument');}})","meta":{"description":"copy file"}},"mv":{"owner":"root","created":1466800151829,"data":"(function(args){if(args.length > 1){var result = boss.utils.splitPathFilename(args[1]);var path = result.path;var filename = result.name;}if(args.length > 2){var result2 = boss.utils.splitPathFilename(args[2]);var path2 = result2.path;var filename2 = result2.name;}if(filename){try{var file = boss.fs.get_file(path, filename);boss.fs.set_file(path2, filename2, file);boss.fs.remove(path, filename, 'file');boss.fs.save();} catch(err){boss.print.error('error : ' + err);}} else if(!filename) {boss.print.error('error: no file argument'); }})","meta":{"description":"move file"}},"rm":{"owner":"root","created":1466800151829,"data":"(function(args){\nif(args.length > 1){\nvar result = boss.utils.splitPathFilename(args[1]);\nvar path = result.path;\nvar name = result.name;\n}\nif(name){\ntry{boss.fs.remove(path, name, 'file');\nboss.fs.save();\n} catch(err){\n//error('error : ' + err);\n}\ntry{boss.fs.remove(path, name, 'dir');\nboss.fs.save();\n} catch(err){\n//error('error : ' + err);\n}\n} else if(!name) {\nboss.print.error('error: no file/dir argument');\n}\n})","meta":{"description":"remove file or dir"}},"js":{"owner":"root","created":1466800151829,"data":"(function(args){\nif(args.length > 1){var result = boss.utils.splitPathFilename(args[1]);var path = result.path;var name = result.name;}if(name){try{boss.print.log(eval(boss.fs.get_file(path,name).data));} catch(err){boss.print.error('error : ' + err);}} else if(!name) {boss.print.error('error: no file argument'); }})","meta":{"description":"run js file"}},"export":{"owner":"root","created":1466800151829,"data":"(function(args){\nboss.print.log(JSON.stringify(boss.fs.export()));\nconsole.log(JSON.stringify(boss.fs.export()));\n})","meta":{"description":"export filesystem"}},"adduser":{"owner":"root","created":1466800151829,"data":"(function(args){\nif(args.length < 4){boss.print.error('error: not enough arguments');} else if( args[2] !== 'root' && args[2] !== 'user') {boss.print.error('error : invalid type ' + args[2]);} else { boss.fs.add_user(args[1], new boss.fs.User(args[1], args[2], args[3]));boss.fs.save();}})","meta":{"description":"add new user"}},"echo":{"owner":"root","created":1466800151829,"data":"(function(args){boss.print.log(args[1])})","meta":{"description":"echo string to console"}},"inspect":{"owner":"root","created":1466800151829,"data":"(function(args){console.log(boss)})","meta":{"description":"log boss object for inspection"}},"test":{"owner":"root","created":1466800151829,"data":"(function(args){boss.print.log('test ls');boss.cmd.ls(args);})","meta":{"description":"test fn. Calls ls"}}}},"etc":{"name":"etc","owner":"root","parent":"","created":1466800151829,"dirs":{},"files":{}},"home":{"name":"root","owner":"root","parent":"root","created":1466800151829,"dirs":{"root":{"name":"root","owner":"root","parent":"home","created":1466800151829,"dirs":{"Documents":{"name":"Documents","owner":"root","parent":"home/root","created":1466800151829,"dirs":{},"files":{}},"Downloads":{"name":"Downloads","owner":"root","parent":"home/root","created":1466800151829,"dirs":{},"files":{}},"Email":{"name":"Email","owner":"root","parent":"home/root","created":1466800151829,"dirs":{},"files":{}},"Images":{"name":"Images","owner":"root","parent":"home/root","created":1466800151829,"dirs":{},"files":{}}},"files":{}}},"files":{}},"lib":{"name":"lib","owner":"root","parent":"","created":1466800151829,"dirs":{},"files":{"print":{"owner":"root","created":1466800151829,"data":"({\n'log':function(txt){boss.term.echo(txt)},\n'error':function(txt){boss.term.echo(txt)}\n})"},"set_prompt":{"owner":"root","created":1466800151829,"data":"(function(txt){boss.term.set_prompt(txt)})"},"push":{"owner":"root","created":1466800151829,"data":"(function(intp, opts){boss.term.push(intp, opts)})"},"pop":{"owner":"root","created":1466800151829,"data":"(function(){boss.term.pop()})"},"utils":{"owner":"root","created":1466800151829,"data":"({\ncalcAbsPath : (arg, args) => {\nvar path = boss.fs.get_cwd();\nif(arg && arg.startsWith('/')){\npath = arg;\n} else if(arg && arg.startsWith('~')){\npath = '/home/' + boss.fs.get_current_username() + arg.slice(1);\n} else if(arg && arg === '..'){\nvar parts = path.split('/');\nparts = parts.slice(0, parts.length - 1);\npath = parts.join('/');\n} else if(args && args.length >= 2 && args[1]){\npath += '/' + arg;\n} else if(!args){\npath += '/' + arg;\n}\nreturn path;\n},\nsplitPathFilename : full => {\nvar path = boss.fs.get_cwd();\nvar name = full;\nvar parts = full.split('/');\nif(parts.length > 1){\nname = parts.pop();\npath = boss.utils.calcAbsPath(parts.join('/'));\n}\nreturn {\npath: path,\nname: name\n}\n}\n})\n"},"Shell":{"owner":"root","created":1466800151829,"data":"(function(boss){this.exec = (command, term) => {boss.term = term;if (command !== '') {var result = command;var args = command.split(' ');if(boss.cmd[args[0]]){boss.cmd[args[0]](args);   }else if(args[0] != undefined) {boss.print.error('unknown command : ' + command);}}} })"},"Login":{"owner":"root","created":1466800151829,"data":"(function(boss){\nvar prompt = 'login: ';\nvar password = false;\nvar username = false;\nthis.exec = (command, term) => {\nboss.term = term;\nif(!boss.fs.get_user(command) && !password){\nboss.print.error( 'unknown user');\n} else if(!password && boss.fs.get_user(command).password){\nboss.set_prompt('password: ');\nusername = command;\npassword = true;\n} else if(boss.fs.get_user(username).password === command){\npassword = false;\nboss.set_prompt('login: ');\nboss.fs.set_current_user(boss.fs.get_user(username));\nboss.fs.set_cwd('/home/' + username);\nboss.print.log('Hello ' + username + '. Welcome to BOSS. Type `help` to see available commands.');\n//var shell = new boss.Shell(boss)\nboss.push(new boss.Shell(boss).exec, {\n'prompt' : boss.fs.get_current_username() + '> '\n});\n} else {\nboss.print.error('unknown username/password combination');\npassword = false;\nboss.set_prompt(prompt);\n}\n}\n})"}}},"mnt":{"name":"mnt","owner":"root","parent":"","created":1466800151829,"dirs":{},"files":{}},"tmp":{"name":"tmp","owner":"root","parent":"","created":1466800151829,"dirs":{},"files":{}},"var":{"name":"var","owner":"root","parent":"","created":1466800151829,"dirs":{},"files":{}},"sys":{"name":"sys","owner":"root","parent":"","created":1466800151829,"dirs":{},"files":{"FileSystem":{"owner":"root","created":1466800151829,"data":"(function FileSystem(r){\n//VARS\nvar root;\nvar cwd;\nvar user;\n//CLASSES\nthis.Dir = function(name, owner, parent){\nthis.name = name;\nthis.owner = owner;\nthis.parent = parent\nthis.created = Date.now();\nthis.dirs = {};\nthis.files = {};\n}\nthis.File = function(owner, data, meta){\nthis.owner = owner;\nthis.created = Date.now();\nthis.data = data;\nthis.meta = meta;\n}\nthis.User = function(username, type, password){\nthis.username = username;\nthis.type = type;\nthis.password = password;\n}\nvar get_dir = path => {\nvar parts = path.split('/');\nvar directory = root;\nfor(var i = 1; i < parts.length; i++){\nif(parts[i] !== ''){\ndirectory = directory.dirs[parts[i]];\n}\n}\nreturn directory;\n}\n//METHODS\nthis.get_cwd = () => {\nreturn cwd;\n}\nthis.set_cwd = (path) => {\nif(get_dir(path)){\ncwd = path;\n} else{\nthrow 'dir does not exist';\n}\n}\nthis.get_file = function(path, filename){\nif(get_dir(path).files[filename]){\nreturn get_dir(path).files[filename];\n} else {\nthrow 'file does not exist';\n}\n}\nthis.set_file = function(path, filename, file){\nget_dir(path).files[filename] = file;\n}\n//add directroy\nthis.add_dir = (path,dir) => { \nif(!get_dir(path).dirs[dir.name]){\nget_dir(path).dirs[dir.name] = dir;\n} else {\nthrow 'dir already exists';\n}\n}\n//remove file or dir\nthis.remove = (path, name, type) => {\nif(type === 'file' && get_dir(path).files[name]){\ndelete get_dir(path).files[name];\n} else if( type === 'dir' && get_dir(path).dirs[name] ){\ndelete get_dir(path).dirs[name];\n} else {\nthrow 'error : does not exist';\n}\n}\n//get directory and file listing\nthis.get_contents = path => {\nvar directory = get_dir(path);\nvar dirs = directory.dirs;\nvar files = directory.files;\nreturn Object.keys(dirs).concat(Object.keys(files));\n}\n//get file listing\nthis.get_files = path => {\nvar directory = get_dir(path);\nvar files = directory.files;\nreturn Object.keys(files);\n}\n//get dir listing\nthis.get_dirs = path => {\nvar directory = get_dir(path);\nvar dirs = directory.dirs;\nreturn Object.keys(dirs);\n}\n//User stuff\nthis.add_user = (key, user) => { \nroot.users[key] = user;\nvar homeDir = new this.Dir(key, key, 'home');\nhomeDir.dirs = {\n'Documents' : new this.Dir('Documents', key, 'home/' + key),\n'Downloads' : new this.Dir('Downloads', key, 'home/' + key),\n'Email' : new this.Dir('Email', key, 'home/' + key),\n'Images' : new this.Dir('Images', key, 'home/' + key)\n}\nthis.add_dir('/home', homeDir); \n}\nthis.get_user = (key) => { return root.users[key] }\nthis.set_current_user = u => { user = u } \nthis.get_current_username = () => { return user.username }\nthis.get_current_user_type = () => { return user.type }\n//return root\nthis.export = () => {\nreturn root;\n}\n//save to localStorage\nthis.save =  () => {\nlocalStorage.setItem('fs', JSON.stringify(root));\n}\nroot = r;\n})"}}}},"files":{},"users":{"root":{"username":"root","type":"root","password":"pass"}}}