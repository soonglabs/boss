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
               "data":"(function(args, client){\n    boss.lib.pop();\n})",
               "meta":{
                  "description":"logout"
               }
            },
            "edit":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;var filename = result.name;\n    }\n    \n    if(filename){\n        try{\n            boss.fs.get_file(path,filename).data = args[2] ? args[2] : '';\n        } catch(err){\n            try{\n                boss.fs.set_file(path,filename, new boss.fs.File(boss.fs.get_current_username,args[2] ? args[2] : ''));\n            } catch(err){\n                boss.lib.print.error('error : ' + err, client);\n            }\n        }\n        \n        boss.fs.save();\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client); \n    }\n})",
               "meta":{
                  "description":"edit file"
               }
            },
            "ace":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args){\n    \n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;var filename = result.name;\n    }\n\n    if(filename){\n        $('body').append(\n            \"<div id='editor' style='position:absolute;top:50px;left:0px;width:100%;height:95%;margin:5px;'></div>\"\n        )\n    \n        var editor = ace.edit('editor');\n        editor.setTheme('ace/theme/monokai');\n        editor.getSession().setMode('ace/mode/javascript');\n        editor.getSession().setValue(boss.fs.get_file(path,filename).data);\n        $('#editor').keydown(function(e) {\n            if(e.keyCode === 27){\n                boss.fs.get_file(path,filename).data = editor.getSession().getValue();\n                $('#editor').remove();\n            }\n        });\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument');\n    }\n})\n",
               "meta":{
                  "description":"open ace editor"
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
               "data":"(function(args, client){\n    boss.lib.print.log(JSON.stringify(boss.fs.export()), client);\n    console.log(JSON.stringify(boss.fs.export()));\n})",
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
               "data":"(function(args, client){\n    if(args.length < 4){\n        boss.lib.print.error('error: not enough arguments', client);\n    } else if( args[2] !== 'root' && args[2] !== 'user') {\n        boss.lib.print.error('error : invalid type ' + args[2], client);\n    } else {\n        boss.fs.add_user(args[1], new boss.fs.User(args[1], args[2], args[3]));\n        boss.fs.save();\n    }\n})",
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
            "test":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(args, client){\n    alert(args[1]);\n    boss.cmd.ls(['ls'], client);\n})",
               "meta":{
                  "description":"test fn. Calls ls"
               }
            },
            "reload":{
               "created":1467087647737,
               "data":"(function(args, client){\n    boss.reload();\n})",
               "meta":{
                  "description":"reload system"
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
                        "test.js":{
                           "created":1467087492210,
                           "data":"console.log('hello boss');"
                        }
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
               "data":"({\n'log':function(txt, client){client.out(txt);},\n'error':function(txt, client){client.out(txt);}\n})"
            },
            "set_prompt":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(txt, client){client.set_prompt(txt)})"
            },
            "push":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(fn){boss.interpreters.push(fn)})"
            },
            "pop":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(){boss.interpreters.pop()})"
            },
            "utils":{
               "owner":"root",
               "created":1467084745397,
               "data":"({\ncalcAbsPath : (arg, args) => {\nvar path = boss.fs.get_cwd();\nif(arg && arg.startsWith('/')){\npath = arg;\n} else if(arg && arg.startsWith('~')){\npath = '/home/' + boss.fs.get_current_username() + arg.slice(1);\n} else if(arg && arg === '..'){\nvar parts = path.split('/');\nparts = parts.slice(0, parts.length - 1);\npath = parts.join('/');\n} else if(args && args.length >= 2 && args[1]){\npath += '/' + arg;\n} else if(!args){\npath += '/' + arg;\n}\nreturn path;\n},\nsplitPathFilename : full => {\nvar path = boss.fs.get_cwd();\nvar name = full;\nvar parts = full.split('/');\nif(parts.length > 1){\nname = parts.pop();\npath = boss.lib.utils.calcAbsPath(parts.join('/'));\n}\nreturn {\npath: path,\nname: name\n}\n}\n})\n"
            },
            "Shell":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(boss){this.exec = (command, client) => {if (command !== '') {var result = command;var args = command.split(' ');if(boss.cmd[args[0]]){boss.cmd[args[0]](args, client);   }else if(args[0] != undefined) {boss.lib.print.error('unknown command : ' + command, client);}}} })"
            },
            "Login":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(boss){\nvar prompt = 'login: ';\nvar password = false;\nvar username = false;\nthis.exec = (command, client) => {\nif(!boss.fs.get_user(command) && !password){\nboss.lib.print.error( 'unknown user', client);\n} else if(!password && boss.fs.get_user(command).password){\nboss.lib.set_prompt('password: ', client);\nusername = command;\npassword = true;\n} else if(boss.fs.get_user(username).password === command){\npassword = false;\nboss.fs.set_current_user(boss.fs.get_user(username));\nboss.lib.set_prompt( username + '> ', client);\nboss.fs.set_cwd('/home/' + username);\nboss.lib.push(new boss.lib.Shell(boss).exec);\nboss.lib.print.log('Hello ' + username + '. Welcome to BOSS. Type `help` to see available commands.', client);\n} else {\nboss.lib.print.error('unknown username/password combination', client);\npassword = false;\nboss.lib.set_prompt(prompt, client);\n}\n}\n})"
            },
            "LoadFS":{
               "owner":"root",
               "created":1467084745397,
               "data":"(function(boss){\n//choose fs to load\n})"
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
               "data":"(function FileSystem(r){\n//VARS\nvar root;\nvar cwd;\nvar user;\n//CLASSES\nthis.Dir = function(name, owner, parent){\nthis.name = name;\nthis.owner = owner;\nthis.parent = parent\nthis.created = Date.now();\nthis.dirs = {};\nthis.files = {};\n}\nthis.File = function(owner, data, meta){\nthis.owner = owner;\nthis.created = Date.now();\nthis.data = data;\nthis.meta = meta;\n}\nthis.User = function(username, type, password){\nthis.username = username;\nthis.type = type;\nthis.password = password;\n}\nvar get_dir = path => {\nvar parts = path.split('/');\nvar directory = root;\nfor(var i = 1; i < parts.length; i++){\nif(parts[i] !== ''){\ndirectory = directory.dirs[parts[i]];\n}\n}\nreturn directory;\n}\n//METHODS\nthis.get_cwd = () => {\nreturn cwd;\n}\nthis.set_cwd = (path) => {\nif(get_dir(path)){\ncwd = path;\n} else{\nthrow 'dir does not exist';\n}\n}\nthis.get_file = function(path, filename){\nif(get_dir(path).files[filename]){\nreturn get_dir(path).files[filename];\n} else {\nthrow 'file does not exist';\n}\n}\nthis.set_file = function(path, filename, file){\nget_dir(path).files[filename] = file;\n}\n//add directroy\nthis.add_dir = (path,dir) => { \nif(!get_dir(path).dirs[dir.name]){\nget_dir(path).dirs[dir.name] = dir;\n} else {\nthrow 'dir already exists';\n}\n}\n//remove file or dir\nthis.remove = (path, name, type) => {\nif(type === 'file' && get_dir(path).files[name]){\ndelete get_dir(path).files[name];\n} else if( type === 'dir' && get_dir(path).dirs[name] ){\ndelete get_dir(path).dirs[name];\n} else {\nthrow 'error : does not exist';\n}\n}\n//get directory and file listing\nthis.get_contents = path => {\nvar directory = get_dir(path);\nvar dirs = directory.dirs;\nvar files = directory.files;\nreturn Object.keys(dirs).concat(Object.keys(files));\n}\n//get file listing\nthis.get_files = path => {\nvar directory = get_dir(path);\nvar files = directory.files;\nreturn Object.keys(files);\n}\n//get dir listing\nthis.get_dirs = path => {\nvar directory = get_dir(path);\nvar dirs = directory.dirs;\nreturn Object.keys(dirs);\n}\n//User stuff\nthis.add_user = (key, user) => { \nroot.users[key] = user;\nvar homeDir = new this.Dir(key, key, 'home');\nhomeDir.dirs = {\n'Documents' : new this.Dir('Documents', key, 'home/' + key),\n'Downloads' : new this.Dir('Downloads', key, 'home/' + key),\n'Email' : new this.Dir('Email', key, 'home/' + key),\n'Images' : new this.Dir('Images', key, 'home/' + key)\n}\nthis.add_dir('/home', homeDir); \n}\nthis.get_user = (key) => { return root.users[key] }\nthis.set_current_user = u => { user = u } \nthis.get_current_username = () => { return user.username }\nthis.get_current_user_type = () => { return user.type }\n//return root\nthis.export = () => {\nreturn root;\n}\n//save to localStorage\nthis.save =  () => {\nlocalStorage.setItem('fs', JSON.stringify(root));\n}\nroot = r;\n})"
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
         "password":"pass"
      }
   }
}