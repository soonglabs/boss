'use strict'

var JSON_IMAGE = {
   "name":"root",
   "owner":"root",
   "parent":null,
   "created":1467084745397,
   "dirs":{
      "bin":{
         "name":"bin",
         "owner":"root",
         "parent":"",
         "created":1467084745397,
         "dirs":{

         },
         "files":{
            "ls":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    var str = ' \\n';\n    var path = boss.lib.utils.calcAbsPath(args[1],args);\n    var list = boss.fs.get_contents(path);\n    \n    for( var i in list ){\n        str += list[i] + '\\n';\n    }\n    \n    boss.lib.print.log(String(str), client);\n    boss.lib.print.log('\\n', client);\n})",
               "meta":{
                  "description":"list files in current dir"
               }
            },
            "mkdir":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;\n        var dirname = result.name;\n    }\n\n    if(dirname){\n        try{\n            boss.fs.add_dir(path, new boss.fs.Dir(dirname, boss.fs.get_current_username(), path));\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    \n        boss.fs.save();\n    } else if(!dirname) {\n        boss.lib.print.error('error: no dir argument', client);\n    }\n})",
               "meta":{
                  "description":"create new dir"
               }
            },
            "read":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;\n        var filename = result.name;\n    }\n    \n    if(filename){\n        try{\n            boss.lib.print.log(boss.fs.get_file(path, filename).data, client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client);\n    }\n})",
               "meta":{
                  "description":"read file"
               }
            },
            "logout":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    client.set_prompt('username: ');\n    boss.lib.pop();\n})",
               "meta":{
                  "description":"logout"
               }
            },
            "cd":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    if(args[1]){\n        try{\n            var path = boss.lib.utils.calcAbsPath(args[1]);\n            boss.fs.set_cwd(path);\n            var list = path.split('/');\n            boss.lib.set_prompt((list.length <= 1 ? '' : list[list.length - 1]) + '> ', client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!args[1]){\n        boss.lib.print.error('error: no directory argument', client);\n    }\n})",
               "meta":{
                  "description":"move to dir"
               }
            },
            "cp":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;var filename = result.name;\n    }\n    \n    if(args.length > 2){\n        var result2 = boss.lib.utils.splitPathFilename(args[2]);\n        var path2 = result2.path;var filename2 = result2.name;\n        \n    }\n    \n    if(filename){\n        try{\n            var file = boss.fs.get_file(path, filename);\n            boss.fs.set_file(path2, filename2, file);\n            boss.fs.save();\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client);\n    }\n})",
               "meta":{
                  "description":"copy file"
               }
            },
            "mv":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;var filename = result.name;\n    }if(args.length > 2){\n        var result2 = boss.lib.utils.splitPathFilename(args[2]);\n        var path2 = result2.path;var filename2 = result2.name;\n    }if(filename){\n        try{\n            var file = boss.fs.get_file(path, filename);\n            boss.fs.set_file(path2, filename2, file);\n            boss.fs.remove(path, filename, 'file');\n            boss.fs.save();\n        } catch(err){\n                boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client); \n    }\n})",
               "meta":{
                  "description":"move file"
               }
            },
            "rm":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;\n        var name = result.name;\n    }\n    \n    if(name){\n        try{\n            boss.fs.remove(path, name, 'file');\n            boss.fs.save();\n        } catch(err){\n            //error('error : ' + err);\n        }\n        try{boss.fs.remove(path, name, 'dir');\n            boss.fs.save();\n        } catch(err){\n            //error('error : ' + err);\n        }\n    } else if(!name) {\n        boss.lib.print.error('error: no file/dir argument', client);\n    }\n})",
               "meta":{
                  "description":"remove file or dir"
               }
            },
            "js":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    \n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;\n        var name = result.name;\n    }if(name){\n        try{\n            boss.lib.print.log(eval(boss.fs.get_file(path,name).data), client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!name) {\n        boss.lib.print.error('error: no file argument', client); \n    }\n})",
               "meta":{
                  "description":"run js file"
               }
            },
            "export":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    \n    $('body').append(\"<a id='downloadAnchorElem' style='display:none'></a>\");\n    \n    var json = JSON.stringify(boss.fs.export());\n    var dataStr = \"data:text/json;charset=utf-8,\" + encodeURIComponent(json);\n    var dlAnchorElem = document.getElementById('downloadAnchorElem');\n    dlAnchorElem.setAttribute(\"href\",     dataStr     );\n    dlAnchorElem.setAttribute(\"download\", \"boss.json\");\n    dlAnchorElem.click();\n    \n    $('#downloadAnchorElem').remove();\n})",
               "meta":{
                  "description":"export filesystem"
               }
            },
            "save":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    boss.fs.save();\n})",
               "meta":{
                  "description":"export filesystem"
               }
            },
            "adduser":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    if(args.length < 4){\n        boss.lib.print.error('error: not enough arguments', client);\n    } else if( args[2] !== 'root' && args[2] !== 'user') {\n        boss.lib.print.error('error : invalid type ' + args[2], client);\n    } else {\n        boss.fs.add_user(args[1], new boss.fs.User(args[1], args[2], boss.lib.utils.hashCode(args[3])));\n        boss.fs.save();\n    }\n})",
               "meta":{
                  "description":"add new user"
               }
            },
            "echo":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    boss.lib.print.log(args[1], client);\n})",
               "meta":{
                  "description":"echo string to console"
               }
            },
            "inspect":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    console.log(boss);\n})",
               "meta":{
                  "description":"log boss object for inspection"
               }
            },
            "reload":{
               "created":1467087647737,
               "data":"(function(args, client){\n    boss.reload();\n    boss.cmd.logout('', client);\n})",
               "meta":{
                  "description":"reload system"
               }
            },
            "write":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;var filename = result.name;\n    }\n    \n    if(filename){\n        try{\n            boss.fs.get_file(path,filename).data = args[2] ? args[2] : '';\n        } catch(err){\n            try{\n                boss.fs.set_file(path,filename, new boss.fs.File(boss.fs.get_current_username,args[2] ? args[2] : ''));\n            } catch(err){\n                boss.lib.print.error('error : ' + err, client);\n            }\n        }\n        \n        boss.fs.save();\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client); \n    }\n})",
               "meta":{
                  "description":"edit file"
               }
            },
            "about":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    boss.lib.print.log(\"\\n\", client); \n    boss.lib.print.log(\".______     ______        _______.     _______.\", client);\n    boss.lib.print.log(\"|   _  \\\\   /  __  \\\\      /       |    /       |\", client);\n    boss.lib.print.log(\"|  |_)  | |  |  |  |    |   (----`   |   (----`\", client);\n    boss.lib.print.log(\"|   _  <  |  |  |  |     \\\\   \\\\        \\\\   \\\\   \", client); \n    boss.lib.print.log(\"|  |_)  | |  `--'  | .----)   |   .----)   |  \", client); \n    boss.lib.print.log(\"|______/   \\\\\\______/  |_______/    |_______/    \", client);\n    boss.lib.print.log(\"\\n\", client);                                           \n    boss.lib.print.log(\"Boss 0.0.1. Browser Operating System Simulator\", client);\n    boss.lib.print.log(\"created by Scott Russell\", client);\n    boss.lib.print.log(\"copyright 2016\", client);\n})",
               "meta":{
                  "description":"test fn. Calls ls"
               }
            },
            "edit":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args,client){\n    \n    var result,path,filename,editor;\n    \n    return new boss.lib.App(args, client, {\n        \n        selector: \"#editor\",\n        template: \"<div id='editor'></div>\",\n        css: \"position:absolute;top:50px;left:0px;width:100%;height:95%;margin:5px;\",\n        controller : {\n            onLoad : (args, client) => {\n                \n                client.toolbar.set_title('<i class=\"fa fa-book app-icon\"></i>Editor');\n                \n                if(args.length > 1){\n                    result = boss.lib.utils.splitPathFilename(args[1]);\n                    path = result.path;\n                    filename = result.name;\n                }\n            \n                if(filename){\n                    \n                    var run = function(){\n                        editor = ace.edit('editor');\n                        editor.setTheme('ace/theme/monokai');\n                        editor.getSession().setMode('ace/mode/javascript');\n                        editor.getSession().setValue(boss.fs.get_file(path,filename).data);\n                    };\n                    \n                    $.getScript(\"https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js\", run);\n                    \n                } else if(!filename) {\n                    boss.lib.print.error('error: no file argument');\n                }\n            },\n            onDestroy : (args, client) => {\n                boss.fs.get_file(path,filename).data = editor.getSession().getValue();\n                client.toolbar.set_title('<i class=\"fa fa-terminal app-icon\"></i>Shell');\n            }\n        }\n    })\n})\n",
               "meta":{
                  "description":"open ace editor"
               }
            },
            "removeuser":{
               "created":1467771258234,
               "data":"",
               "meta":{
                  "description":"remove user"
               }
            }
         }
      },
      "etc":{
         "name":"etc",
         "owner":"root",
         "parent":"",
         "created":1467084745401,
         "dirs":{

         },
         "files":{

         }
      },
      "home":{
         "name":"root",
         "owner":"root",
         "parent":"root",
         "created":1467084745401,
         "dirs":{
            "root":{
               "name":"root",
               "owner":"root",
               "parent":"home",
               "created":1467084745401,
               "dirs":{
                  "Documents":{
                     "name":"Documents",
                     "owner":"root",
                     "parent":"home/root",
                     "created":1467084745401,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Downloads":{
                     "name":"Downloads",
                     "owner":"root",
                     "parent":"home/root",
                     "created":1467084745401,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Email":{
                     "name":"Email",
                     "owner":"root",
                     "parent":"home/root",
                     "created":1467084745401,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Images":{
                     "name":"Images",
                     "owner":"root",
                     "parent":"home/root",
                     "created":1467084745401,
                     "dirs":{

                     },
                     "files":{

                     }
                  }
               },
               "files":{

               }
            },
            "scott":{
               "name":"scott",
               "owner":"scott",
               "parent":"home",
               "created":1467599655450,
               "dirs":{
                  "Documents":{
                     "name":"Documents",
                     "owner":"scott",
                     "parent":"home/scott",
                     "created":1467599655450,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Downloads":{
                     "name":"Downloads",
                     "owner":"scott",
                     "parent":"home/scott",
                     "created":1467599655450,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Email":{
                     "name":"Email",
                     "owner":"scott",
                     "parent":"home/scott",
                     "created":1467599655450,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Images":{
                     "name":"Images",
                     "owner":"scott",
                     "parent":"home/scott",
                     "created":1467599655450,
                     "dirs":{

                     },
                     "files":{

                     }
                  }
               },
               "files":{

               }
            },
            "bee":{
               "name":"bee",
               "owner":"bee",
               "parent":"home",
               "created":1467604094331,
               "dirs":{
                  "Documents":{
                     "name":"Documents",
                     "owner":"bee",
                     "parent":"home/bee",
                     "created":1467604094331,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Downloads":{
                     "name":"Downloads",
                     "owner":"bee",
                     "parent":"home/bee",
                     "created":1467604094331,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Email":{
                     "name":"Email",
                     "owner":"bee",
                     "parent":"home/bee",
                     "created":1467604094331,
                     "dirs":{

                     },
                     "files":{

                     }
                  },
                  "Images":{
                     "name":"Images",
                     "owner":"bee",
                     "parent":"home/bee",
                     "created":1467604094331,
                     "dirs":{

                     },
                     "files":{

                     }
                  }
               },
               "files":{

               }
            }
         },
         "files":{

         }
      },
      "lib":{
         "name":"lib",
         "owner":"root",
         "parent":"",
         "created":1467084745397,
         "dirs":{

         },
         "files":{
            "print":{
               "owner":"root",
               "created":1467084745397,
               "data":"({\n    'log':function(txt, client){client.out(txt);},\n    'error':function(txt, client){client.out(txt);}\n})"
            },
            "set_prompt":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(txt, client){\n    client.set_prompt(txt)\n})"
            },
            "push":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(fn){\n    boss.interpreters.push(fn)\n})"
            },
            "pop":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(){\n    boss.interpreters.pop()\n})"
            },
            "utils":{
               "owner":"root",
               "created":1467084745397,
               "data":"({\n    calcAbsPath : (arg, args) => {\n        var path = boss.fs.get_cwd();\n        if(arg && arg.startsWith('/')){\n            path = arg;\n        } else if(arg && arg.startsWith('~')){\n            path = '/home/' + boss.fs.get_current_username() + arg.slice(1);\n        } else if(arg && arg === '..'){\n            var parts = path.split('/');\n            parts = parts.slice(0, parts.length - 1);\n            path = parts.join('/');\n        } else if(args && args.length >= 2 && args[1]){\n            path += '/' + arg;\n        } else if(!args){\n            path += '/' + arg;\n        }\n        return path;\n    },\n    splitPathFilename : full => {\n        var path = boss.fs.get_cwd();\n        var name = full;\n        var parts = full.split('/');\n        if(parts.length > 1){\n            name = parts.pop();\n            path = boss.lib.utils.calcAbsPath(parts.join('/'));\n        }\n        return {\n            path: path,\n            name: name\n        }\n    },\n    hashCode : (string) => {\n        //credit: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/\n    \tvar hash = 0;\n    \tif (string.length == 0) return hash;\n    \tfor (var i = 0; i < string.length; i++) {\n    \t\tvar char = string.charCodeAt(i);\n    \t\tvar hash = ((hash<<5)-hash)+char;\n    \t\thash = hash & hash; // Convert to 32bit integer\n    \t}\n    \treturn hash;\n    }\n})\n"
            },
            "Shell":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(boss){\n    this.exec = (command, client) => {\n        if (command !== '') {\n            var result = command;\n            var args = command.split(' ');\n            if(boss.cmd[args[0]]){\n                boss.cmd[args[0]](args, client);\n            }else if(args[0] != undefined) {\n                boss.lib.print.error('unknown command : ' + command, client);\n            }\n        }\n    } \n})"
            },
            "Login":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(boss){\n    \n    var username = false;\n    \n    this.username = (command, client) => {\n        \n        if(!boss.fs.get_user(command)){\n            boss.lib.print.error( 'unknown user', client);\n        } else if(boss.fs.get_user(command).password){\n            boss.lib.set_prompt('password: ', client);\n            username = command;\n            boss.lib.push(this.password);\n        }\n    }\n    \n    this.password = (command, client) => {\n        \n        if(boss.fs.get_user(username).password == boss.lib.utils.hashCode(command)){\n            boss.fs.set_current_user(boss.fs.get_user(username));\n            boss.lib.set_prompt( username + '> ', client);\n            boss.fs.set_cwd('/home/' + username);\n            boss.lib.pop();\n            boss.lib.push(new boss.lib.Shell(boss).exec);\n            boss.cmd.about('', client);\n            boss.lib.print.log('Hello ' + username + '. Welcome to BOSS. Type `help` to see available commands.', client);\n        } else {\n            boss.lib.print.error('unknown username/password combination', client);\n            boss.lib.set_prompt('username: ', client);\n            boss.lib.pop();\n        }\n    }\n})"
            },
            "App":{
               "created":1467649101124,
               "data":"(function(args, client, config){\n    \n    //config object\n    //selector\n    //template\n    //css\n    //controller\n    \n    //add template to body        \n    $('body').append(config.template);\n    \n    //add css\n    var target = $(config.selector);\n    target.attr(\"style\", target.attr(\"style\") + \"; \" + config.css);\n    \n    //call controller onload\n    config.controller.onLoad(args, client);\n        \n    //add escape key\n    $(config.selector).keydown(function(e) {\n        if(e.keyCode === 27){\n            config.controller.onDestroy(args, client);\n            $(config.selector).remove();\n        }\n    });\n})"
            }
         }
      },
      "mnt":{
         "name":"mnt",
         "owner":"root",
         "parent":"",
         "created":1467084745401,
         "dirs":{

         },
         "files":{

         }
      },
      "tmp":{
         "name":"tmp",
         "owner":"root",
         "parent":"",
         "created":1467084745401,
         "dirs":{

         },
         "files":{

         }
      },
      "var":{
         "name":"var",
         "owner":"root",
         "parent":"",
         "created":1467084745401,
         "dirs":{

         },
         "files":{

         }
      },
      "sys":{
         "name":"sys",
         "owner":"root",
         "parent":"",
         "created":1467084745397,
         "dirs":{

         },
         "files":{
            "FileSystem":{
               "owner":"root",
               "created":1467084745401,
               "data":"(function FileSystem(r){\n    \n    //VARS\n    var root;\n    var cwd;\n    var user;\n    \n    //CLASSES\n    this.Dir = function(name, owner, parent){\n        this.name = name;\n        this.owner = owner;\n        this.parent = parent\n        this.created = Date.now();\n        this.dirs = {};\n        this.files = {};\n    }\n    \n    this.File = function(owner, data, meta){\n        this.owner = owner;\n        this.created = Date.now();\n        this.data = data;\n        this.meta = meta;\n    }\n    \n    this.User = function(username, type, password){\n        this.username = username;\n        this.type = type;\n        this.password = password;\n    }\n    \n    var get_dir = path => {\n        var parts = path.split('/');\n        var directory = root;\n        \n        for(var i = 1; i < parts.length; i++){\n            if(parts[i] !== ''){\n                directory = directory.dirs[parts[i]];\n            }\n        }\n        return directory;\n    }\n    \n    //METHODS\n    this.get_cwd = () => {\n        return cwd;\n    }\n    this.set_cwd = (path) => {\n        if(get_dir(path)){\n            cwd = path;\n        } else{\n            throw 'dir does not exist';\n        }\n    }\n    \n    this.get_file = function(path, filename){\n        if(get_dir(path).files[filename]){\n            return get_dir(path).files[filename];\n        } else {\n            throw 'file does not exist';\n        }\n    }\n    \n    this.set_file = function(path, filename, file){\n        get_dir(path).files[filename] = file;\n    }\n    \n    //add directroy\n    this.add_dir = (path,dir) => { \n        if(!get_dir(path).dirs[dir.name]){\n            get_dir(path).dirs[dir.name] = dir;\n        } else {\n            throw 'dir already exists';\n        }\n    }\n    \n    //remove file or dir\n    this.remove = (path, name, type) => {\n        if(type === 'file' && get_dir(path).files[name]){\n            delete get_dir(path).files[name];\n        } else if( type === 'dir' && get_dir(path).dirs[name] ){\n            delete get_dir(path).dirs[name];\n        } else {\n            throw 'error : does not exist';\n        }\n    }\n    \n    //get directory and file listing\n    this.get_contents = path => {\n        var directory = get_dir(path);\n        var dirs = directory.dirs;\n        var files = directory.files;\n        return Object.keys(dirs).concat(Object.keys(files));\n    }\n    \n    //get file listing\n    this.get_files = path => {\n        var directory = get_dir(path);\n        var files = directory.files;\n        return Object.keys(files);\n    }\n    \n    //get dir listing\n    this.get_dirs = path => {\n        var directory = get_dir(path);\n        var dirs = directory.dirs;\n        return Object.keys(dirs);\n    }\n    \n    //User stuff\n    this.add_user = (key, user) => { \n        root.users[key] = user;\n        var homeDir = new this.Dir(key, key, 'home');\n        homeDir.dirs = {\n            'Documents' : new this.Dir('Documents', key, 'home/' + key),\n            'Downloads' : new this.Dir('Downloads', key, 'home/' + key),\n            'Email' : new this.Dir('Email', key, 'home/' + key),\n            'Images' : new this.Dir('Images', key, 'home/' + key)\n        }\n    \n        this.add_dir('/home', homeDir); \n    }\n    \n    this.get_user = (key) => { return root.users[key] }\n    this.set_current_user = u => { user = u } \n    this.get_current_username = () => { return user.username }\n    this.get_current_user_type = () => { return user.type }\n    \n    //return root\n    this.export = () => {\n        return root;\n    }\n    \n    //save to localStorage\n    this.save =  () => {\n        localStorage.setItem('fs', JSON.stringify(root));\n    }\n    root = r;\n})"
            }
         }
      }
   },
   "files":{

   },
   "users":{
      "root":{
         "username":"root",
         "type":"root",
         "password":"3433489"
      },
      "scott":{
         "username":"scott",
         "type":"root",
         "password":"3059529"
      },
      "bee":{
         "username":"bee",
         "type":"user",
         "password":3019832
      }
   }
}