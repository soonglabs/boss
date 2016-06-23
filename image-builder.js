'use strict'
//build default image while developing

var DEFAULT_IMAGE = new Dir('root', 'root', null);
        DEFAULT_IMAGE.users = {
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
                    "boss.print.log(String(str));\n"+
                    "boss.print.log('\\n');\n"+
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
                   "var result = boss.fs.utils.splitPathFilename(args[1]);\n"+
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
                            "var path = boss.fs.utils.calcAbsPath(args[1]);\n"+
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
                        "boss.print.error('error: no file/dir argument');\n"+
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
                        "boss.fs.add_user(args[1], new User(args[1], args[2], args[3]));"+
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
                        "boss.push(boss.shell.exec, {\n"+
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
        };