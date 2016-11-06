'use strict'

var JSON_IMAGE ={
  "dirs": {
    "bin": {
      "dirs": {
        "about": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.lib.print.log(\"\\n\", client); \n    boss.lib.print.log(\".______     ______        _______.     _______.\", client);\n    boss.lib.print.log(\"|   _  \\\\   /  __  \\\\      /       |    /       |\", client);\n    boss.lib.print.log(\"|  |_)  | |  |  |  |    |   (----`   |   (----`\", client);\n    boss.lib.print.log(\"|   _  <  |  |  |  |     \\\\   \\\\        \\\\   \\\\   \", client); \n    boss.lib.print.log(\"|  |_)  | |  `--'  | .----)   |   .----)   |  \", client); \n    boss.lib.print.log(\"|______/   \\\\\\______/  |_______/    |_______/    \", client);\n    boss.lib.print.log(\"\\n\", client);                                           \n    boss.lib.print.log(\"Boss 0.0.1. Browser Operating System Simulator\", client);\n    boss.lib.print.log(\"created by Scott Russell\", client);\n    boss.lib.print.log(\"copyright 2016\", client);\n})",
                  "owner": "root",
                  "created": 1478463134396,
                  "parent": "about"
                }
              },
              "name": "src",
              "parent": "about",
              "owner": "root",
              "created": 1478463134396
            }
          },
          "files": {},
          "name": "about",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134395
        },
        "adduser": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length < 4){\n        boss.lib.print.error('error: not enough arguments', client);\n    } else if(args[2] !== 'root' && args[2] !== 'user') {\n        boss.lib.print.error('error : invalid type ' + args[2], client);\n    } else {\n        boss.fs.add_user(args[1], new boss.fs.User(args[1], args[2], boss.lib.utils.hashCode(args[3])));\n        boss.fs.save();\n    }\n})",
                  "owner": "root",
                  "created": 1478463134397,
                  "parent": "adduser"
                }
              },
              "name": "src",
              "parent": "adduser",
              "owner": "root",
              "created": 1478463134396
            }
          },
          "files": {},
          "name": "adduser",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134396
        },
        "cd": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args[1]){\n        try{\n            var path = boss.lib.utils.calcAbsPath(args[1]);\n            boss.fs.set_cwd(path);\n            var list = path.split('/');\n            boss.lib.set_prompt((list.length <= 1 ? '' : list[list.length - 1]) + '> ', client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!args[1]){\n        boss.lib.print.error('error: no directory argument', client);\n    }\n})",
                  "owner": "root",
                  "created": 1478463134398,
                  "parent": "cd"
                }
              },
              "name": "src",
              "parent": "cd",
              "owner": "root",
              "created": 1478463134397
            }
          },
          "files": {},
          "name": "cd",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134397
        },
        "cp": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;var filename = result.name;\n    }\n    \n    if(args.length > 2){\n        var result2 = boss.lib.utils.splitPathFilename(args[2]);\n        var path2 = result2.path;var filename2 = result2.name;\n        \n    }\n    \n    if(filename){\n        try{\n            var file = boss.fs.get_file(path, filename);\n            boss.fs.set_file(path2, filename2, file);\n            boss.fs.save();\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client);\n    }\n})",
                  "owner": "root",
                  "created": 1478463134398,
                  "parent": "cp"
                }
              },
              "name": "src",
              "parent": "cp",
              "owner": "root",
              "created": 1478463134398
            }
          },
          "files": {},
          "name": "cp",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134398
        },
        "echo": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.lib.print.log(args[1], client);\n})",
                  "owner": "root",
                  "created": 1478463134399,
                  "parent": "echo"
                }
              },
              "name": "src",
              "parent": "echo",
              "owner": "root",
              "created": 1478463134399
            }
          },
          "files": {},
          "name": "echo",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134398
        },
        "edit": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args,client){\n    \n    var result,path,filename,editor;\n    \n    return new boss.lib.App(args, client, {\n        name: '<i class=\"fa fa-book app-icon\"></i>Editor',\n        message: ' - <i class=\"fa fa-circle change-icon\" style=\"color:green;\"></i> ',\n        selector: \"#editor\",\n        template: \"<div id='editor'></div>\",\n        css: \"position:absolute;top:50px;left:0px;width:100%;height:95%;margin:5px;\",\n        onLoad : (app, args, client) => {\n                \n            if(args.length > 1){\n                var result = boss.lib.utils.splitPathFilename(args[1]);\n                var path = result.path;\n                var filename = result.name;\n            }\n            \n            if(filename){\n                \n                client.toolbar.set_message(app.config.message + filename);\n                    \n                var run = function(){\n                    \n                    app.change = false;\n                    app.editor = ace.edit('editor');\n                    app.editor.$blockScrolling = Infinity;\n                    app.editor.setTheme('ace/theme/monokai');\n                    app.editor.getSession().setMode('ace/mode/javascript');\n                    app.editor.getSession().setValue(boss.fs.get_file(path,filename).data);\n                    \n                    //on editor change\n                    app.editor.on('change', function(data){\n                        app.change = true;\n                        $('.change-icon').css('color','red');\n                    });\n                    \n                    //on save\n                    $(app.config.selector).keydown(function(e) {\n                        if(e.keyCode === 83 && e.ctrlKey  && e.shiftKey){\n                            app.change = false;\n                            boss.fs.get_file(path,filename).data = app.editor.getSession().getValue();\n                            boss.fs.save();\n                            $('.change-icon').css('color','green');\n                        }\n                    });\n                    \n                    //on exit\n                    $(app.config.selector).keydown(function(e) {\n                        if(e.keyCode === 27 && app.change){\n                            var c = confirm('You have unsaved changes. Would you like to exit?');\n                            if(c){\n                                app.config.onDestroy(app, args, client);\n                                $(app.config.selector).remove();\n                            }\n                        } else if(e.keyCode === 27 ){\n                           app.config.onDestroy(app, args, client);\n                           $(app.config.selector).remove();\n                        }\n                    });\n                };\n                    \n                $.getScript(\"https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js\", run);\n                    \n            } else if(!filename) {\n                boss.lib.print.error('error: no file argument');\n            }\n        },\n        onDestroy : (app, args, client) => {\n            client.toolbar.set_title('<i class=\"fa fa-terminal app-icon\"></i>Shell');\n            client.toolbar.set_message('');\n        }\n    })\n})\n",
                  "owner": "root",
                  "created": 1478463134400,
                  "parent": "edit"
                }
              },
              "name": "src",
              "parent": "edit",
              "owner": "root",
              "created": 1478463134400
            }
          },
          "files": {},
          "name": "edit",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134399
        },
        "exit": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.lib.pop();\n})",
                  "owner": "root",
                  "created": 1478463134401,
                  "parent": "exit"
                }
              },
              "name": "src",
              "parent": "exit",
              "owner": "root",
              "created": 1478463134400
            }
          },
          "files": {},
          "name": "exit",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134400
        },
        "export": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    \n    $('body').append(\"<a id='downloadAnchorElem' style='display:none'></a>\");\n    \n    var json = JSON.stringify(boss.fs.export());\n    var dataStr = \"data:text/json;charset=utf-8,\" + encodeURIComponent(json);\n    var dlAnchorElem = document.getElementById('downloadAnchorElem');\n    dlAnchorElem.setAttribute(\"href\",     dataStr     );\n    dlAnchorElem.setAttribute(\"download\", \"boss.json\");\n    dlAnchorElem.click();\n    \n    $('#downloadAnchorElem').remove();\n})",
                  "owner": "root",
                  "created": 1478463134401,
                  "parent": "export"
                }
              },
              "name": "src",
              "parent": "export",
              "owner": "root",
              "created": 1478463134401
            }
          },
          "files": {},
          "name": "export",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134401
        },
        "inspect": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    console.log(boss);\n})",
                  "owner": "root",
                  "created": 1478463134402,
                  "parent": "inspect"
                }
              },
              "name": "src",
              "parent": "inspect",
              "owner": "root",
              "created": 1478463134402
            }
          },
          "files": {},
          "name": "inspect",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134401
        },
        "js": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    \n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;\n        var name = result.name;\n    }if(name){\n        try{\n            boss.lib.print.log(eval(boss.fs.get_file(path,name).data), client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!name) {\n        boss.lib.print.error('error: no file argument', client); \n    }\n})",
                  "owner": "root",
                  "created": 1478463134403,
                  "parent": "js"
                }
              },
              "name": "src",
              "parent": "js",
              "owner": "root",
              "created": 1478463134402
            }
          },
          "files": {},
          "name": "js",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134402
        },
        "logout": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    client.set_prompt('username: ');\n    boss.lib.pop();\n})",
                  "owner": "root",
                  "created": 1478463134403,
                  "parent": "logout"
                }
              },
              "name": "src",
              "parent": "logout",
              "owner": "root",
              "created": 1478463134403
            }
          },
          "files": {},
          "name": "logout",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134403
        },
        "ls": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    var str = '';\n    var path = boss.lib.utils.calcAbsPath(args[1],args);\n    var list = boss.fs.get_contents(path);\n    \n    for( var i in list ){\n        str += list[i] + '\\n';\n    }\n    \n    boss.lib.print.log(String(str), client);\n})",
                  "owner": "root",
                  "created": 1478463134404,
                  "parent": "ls"
                }
              },
              "name": "src",
              "parent": "ls",
              "owner": "root",
              "created": 1478463134404
            }
          },
          "files": {},
          "name": "ls",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134403
        },
        "mkdir": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;\n        var dirname = result.name;\n    }\n\n    if(dirname){\n        try{\n            boss.fs.add_dir(path, new boss.fs.Dir(dirname, boss.fs.get_current_username(), path));\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    \n        boss.fs.save();\n    } else if(!dirname) {\n        boss.lib.print.error('error: no dir argument', client);\n    }\n})",
                  "owner": "root",
                  "created": 1478463134405,
                  "parent": "mkdir"
                }
              },
              "name": "src",
              "parent": "mkdir",
              "owner": "root",
              "created": 1478463134404
            }
          },
          "files": {},
          "name": "mkdir",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134404
        },
        "mv": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;var filename = result.name;\n    }if(args.length > 2){\n        var result2 = boss.lib.utils.splitPathFilename(args[2]);\n        var path2 = result2.path;var filename2 = result2.name;\n    }if(filename){\n        try{\n            var file = boss.fs.get_file(path, filename);\n            boss.fs.set_file(path2, filename2, file);\n            boss.fs.remove(path, filename, 'file');\n            boss.fs.save();\n        } catch(err){\n                boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client); \n    }\n})",
                  "owner": "root",
                  "created": 1478463134405,
                  "parent": "mv"
                }
              },
              "name": "src",
              "parent": "mv",
              "owner": "root",
              "created": 1478463134405
            }
          },
          "files": {},
          "name": "mv",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134405
        },
        "read": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;\n        var filename = result.name;\n    }\n    \n    if(filename){\n        try{\n            boss.lib.print.log(boss.fs.get_file(path, filename).data, client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client);\n    }\n})",
                  "owner": "root",
                  "created": 1478463134406,
                  "parent": "read"
                }
              },
              "name": "src",
              "parent": "read",
              "owner": "root",
              "created": 1478463134406
            }
          },
          "files": {},
          "name": "read",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134406
        },
        "reload": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.reload();\n    boss.cmd.logout('', client);\n})",
                  "owner": "root",
                  "created": 1478463134407,
                  "parent": "reload"
                }
              },
              "name": "src",
              "parent": "reload",
              "owner": "root",
              "created": 1478463134407
            }
          },
          "files": {},
          "name": "reload",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134406
        },
        "rm": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;\n        var name = result.name;\n    }\n    \n    if(name){\n        try{\n            boss.fs.remove(path, name, 'file');\n            boss.fs.save();\n        } catch(err){\n            //error('error : ' + err);\n        }\n        try{boss.fs.remove(path, name, 'dir');\n            boss.fs.save();\n        } catch(err){\n            //error('error : ' + err);\n        }\n    } else if(!name) {\n        boss.lib.print.error('error: no file/dir argument', client);\n    }\n})",
                  "owner": "root",
                  "created": 1478463134408,
                  "parent": "rm"
                }
              },
              "name": "src",
              "parent": "rm",
              "owner": "root",
              "created": 1478463134407
            }
          },
          "files": {},
          "name": "rm",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134407
        },
        "rmuser": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "",
                  "owner": "root",
                  "created": 1478463134408,
                  "parent": "rmuser"
                }
              },
              "name": "src",
              "parent": "rmuser",
              "owner": "root",
              "created": 1478463134408
            }
          },
          "files": {},
          "name": "rmuser",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134408
        },
        "save": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.fs.save();\n})",
                  "owner": "root",
                  "created": 1478463134409,
                  "parent": "save"
                }
              },
              "name": "src",
              "parent": "save",
              "owner": "root",
              "created": 1478463134409
            }
          },
          "files": {},
          "name": "save",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134409
        },
        "write": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1]);\n        var path = result.path;var filename = result.name;\n    }\n    \n    if(filename){\n        try{\n            boss.fs.get_file(path,filename).data = args[2] ? args[2] : '';\n        } catch(err){\n            try{\n                boss.fs.set_file(path,filename, new boss.fs.File(boss.fs.get_current_username,args[2] ? args[2] : ''));\n            } catch(err){\n                boss.lib.print.error('error : ' + err, client);\n            }\n        }\n        \n        boss.fs.save();\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client); \n    }\n})",
                  "owner": "root",
                  "created": 1478463134410,
                  "parent": "write"
                }
              },
              "name": "src",
              "parent": "write",
              "owner": "root",
              "created": 1478463134409
            }
          },
          "files": {},
          "name": "write",
          "parent": "bin",
          "owner": "root",
          "created": 1478463134409
        }
      },
      "files": {},
      "name": "bin",
      "parent": "root",
      "owner": "root",
      "created": 1478463134395
    },
    "etc": {
      "dirs": {},
      "files": {},
      "name": "etc",
      "parent": "root",
      "owner": "root",
      "created": 1478463134410
    },
    "home": {
      "dirs": {
        "root": {
          "dirs": {
            "Documents": {
              "dirs": {},
              "files": {},
              "name": "Documents",
              "parent": "root",
              "owner": "root",
              "created": 1478463134411
            },
            "Downloads": {
              "dirs": {},
              "files": {},
              "name": "Downloads",
              "parent": "root",
              "owner": "root",
              "created": 1478463134411
            },
            "Email": {
              "dirs": {},
              "files": {},
              "name": "Email",
              "parent": "root",
              "owner": "root",
              "created": 1478463134411
            },
            "Images": {
              "dirs": {},
              "files": {},
              "name": "Images",
              "parent": "root",
              "owner": "root",
              "created": 1478463134411
            }
          },
          "files": {},
          "name": "root",
          "parent": "home",
          "owner": "root",
          "created": 1478463134410
        }
      },
      "files": {},
      "name": "home",
      "parent": "root",
      "owner": "root",
      "created": 1478463134410
    },
    "lib": {
      "dirs": {
        "App": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client, config){\n    \n    this.config = config;\n    \n    client.toolbar.set_title(config.name);\n    \n    //add template to body        \n    $('body').append(config.template);\n    \n    //add css\n    var target = $(config.selector);\n    target.attr(\"style\", target.attr(\"style\") + \"; \" + config.css);\n    \n    //call controller onload\n    config.onLoad(this, args, client);\n})",
                  "owner": "root",
                  "created": 1478463134413,
                  "parent": "App"
                }
              },
              "name": "src",
              "parent": "App",
              "owner": "root",
              "created": 1478463134413
            }
          },
          "files": {},
          "name": "App",
          "parent": "lib",
          "owner": "root",
          "created": 1478463134412
        },
        "Login": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(boss){\n    \n    var username = false;\n    \n    this.username = (command, client) => {\n        \n        if(!boss.fs.get_user(command)){\n            boss.lib.print.error( 'unknown user', client);\n        } else if(boss.fs.get_user(command).password){\n            boss.lib.set_prompt('password: ', client);\n            username = command;\n            boss.lib.push(this.password);\n        }\n    }\n    \n    this.password = (command, client) => {\n        \n        if(boss.fs.get_user(username).password == boss.lib.utils.hashCode(command)){\n            boss.fs.set_current_user(boss.fs.get_user(username));\n            boss.lib.set_prompt( username + '> ', client);\n            boss.fs.set_cwd('/home/' + username);\n            boss.lib.pop();\n            boss.lib.push(new boss.lib.Shell(boss).exec);\n            client.toolbar.set_title('<i class=\"fa fa-terminal app-icon\"></i>Shell');\n            client.toolbar.set_message('');\n            boss.cmd.about('', client);\n            boss.lib.print.log('Hello ' + username + '. Welcome to BOSS. Type `help` to see available commands.', client);\n        } else {\n            boss.lib.print.error('unknown username/password combination', client);\n            boss.lib.set_prompt('username: ', client);\n            boss.lib.pop();\n        }\n    }\n})",
                  "owner": "root",
                  "created": 1478463134414,
                  "parent": "Login"
                }
              },
              "name": "src",
              "parent": "Login",
              "owner": "root",
              "created": 1478463134413
            }
          },
          "files": {},
          "name": "Login",
          "parent": "lib",
          "owner": "root",
          "created": 1478463134413
        },
        "pop": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(){\n    boss.interpreters.pop()\n})",
                  "owner": "root",
                  "created": 1478463134415,
                  "parent": "pop"
                }
              },
              "name": "src",
              "parent": "pop",
              "owner": "root",
              "created": 1478463134415
            }
          },
          "files": {},
          "name": "pop",
          "parent": "lib",
          "owner": "root",
          "created": 1478463134415
        },
        "print": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "({\n    'log':function(txt, client){client.out(txt);},\n    'error':function(txt, client){client.out(txt);}\n})",
                  "owner": "root",
                  "created": 1478463134416,
                  "parent": "print"
                }
              },
              "name": "src",
              "parent": "print",
              "owner": "root",
              "created": 1478463134416
            }
          },
          "files": {},
          "name": "print",
          "parent": "lib",
          "owner": "root",
          "created": 1478463134415
        },
        "push": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(fn){\n    boss.interpreters.push(fn)\n})",
                  "owner": "root",
                  "created": 1478463134417,
                  "parent": "push"
                }
              },
              "name": "src",
              "parent": "push",
              "owner": "root",
              "created": 1478463134416
            }
          },
          "files": {},
          "name": "push",
          "parent": "lib",
          "owner": "root",
          "created": 1478463134416
        },
        "set_prompt": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(txt, client){\n    client.set_prompt(txt)\n})",
                  "owner": "root",
                  "created": 1478463134417,
                  "parent": "set_prompt"
                }
              },
              "name": "src",
              "parent": "set_prompt",
              "owner": "root",
              "created": 1478463134417
            }
          },
          "files": {},
          "name": "set_prompt",
          "parent": "lib",
          "owner": "root",
          "created": 1478463134417
        },
        "Shell": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(boss){\n    this.exec = (command, client) => {\n        if (command !== '') {\n            var result = command;\n            var args = command.split(' ');\n            if(boss.cmd[args[0]]){\n                boss.cmd[args[0]](args, client);\n            }else if(args[0] != undefined) {\n                boss.lib.print.error('unknown command : ' + command, client);\n            }\n        }\n    } \n})",
                  "owner": "root",
                  "created": 1478463134418,
                  "parent": "Shell"
                }
              },
              "name": "src",
              "parent": "Shell",
              "owner": "root",
              "created": 1478463134418
            }
          },
          "files": {},
          "name": "Shell",
          "parent": "lib",
          "owner": "root",
          "created": 1478463134418
        },
        "utils": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "({\n    calcAbsPath : (arg, args) => {\n        var path = boss.fs.get_cwd();\n        if(arg && arg.startsWith('/')){\n            path = arg;\n        } else if(arg && arg.startsWith('~')){\n            path = '/home/' + boss.fs.get_current_username() + arg.slice(1);\n        } else if(arg && arg === '..'){\n            var parts = path.split('/');\n            parts = parts.slice(0, parts.length - 1);\n            path = parts.join('/');\n        } else if(args && args.length >= 2 && args[1]){\n            path += '/' + arg;\n        } else if(!args){\n            path += '/' + arg;\n        }\n        return path;\n    },\n    splitPathFilename : full => {\n        var path = boss.fs.get_cwd();\n        var name = full;\n        var parts = full.split('/');\n        if(parts.length > 1){\n            name = parts.pop();\n            path = boss.lib.utils.calcAbsPath(parts.join('/'));\n        }\n        return {\n            path: path,\n            name: name\n        }\n    },\n    hashCode : (string) => {\n        //credit: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/\n    \tvar hash = 0;\n    \tif (string.length == 0) return hash;\n    \tfor (var i = 0; i < string.length; i++) {\n    \t\tvar char = string.charCodeAt(i);\n    \t\tvar hash = ((hash<<5)-hash)+char;\n    \t\thash = hash & hash; // Convert to 32bit integer\n    \t}\n    \treturn hash;\n    }\n})\n",
                  "owner": "root",
                  "created": 1478463134419,
                  "parent": "utils"
                }
              },
              "name": "src",
              "parent": "utils",
              "owner": "root",
              "created": 1478463134418
            }
          },
          "files": {},
          "name": "utils",
          "parent": "lib",
          "owner": "root",
          "created": 1478463134418
        }
      },
      "files": {},
      "name": "lib",
      "parent": "root",
      "owner": "root",
      "created": 1478463134412
    },
    "mnt": {
      "dirs": {},
      "files": {},
      "name": "mnt",
      "parent": "root",
      "owner": "root",
      "created": 1478463134419
    },
    "sys": {
      "dirs": {
        "FileSystem": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function FileSystem(r, name){\n    \n    this.name = name;\n    r.users = JSON.parse(r.files['users.json']['data']);\n    //VARS\n    var root;\n    var cwd;\n    var user;\n    \n    //CLASSES\n    this.Dir = function(name, owner, parent){\n        this.name = name;\n        this.owner = owner;\n        this.parent = parent\n        this.created = Date.now();\n        this.dirs = {};\n        this.files = {};\n    }\n    \n    this.File = function(owner, data, meta){\n        this.owner = owner;\n        this.created = Date.now();\n        this.data = data;\n        this.meta = meta;\n    }\n    \n    this.User = function(username, type, password){\n        this.username = username;\n        this.type = type;\n        this.password = password;\n    }\n    \n    var get_dir = path => {\n        var parts = path.split('/');\n        var directory = root;\n        \n        for(var i = 1; i < parts.length; i++){\n            if(parts[i] !== ''){\n                directory = directory.dirs[parts[i]];\n            }\n        }\n        return directory;\n    }\n    \n    //METHODS\n    this.get_cwd = () => {\n        return cwd;\n    }\n    this.set_cwd = (path) => {\n        if(get_dir(path)){\n            cwd = path;\n        } else{\n            throw 'dir does not exist';\n        }\n    }\n    \n    this.get_file = function(path, filename){\n        if(get_dir(path).files[filename]){\n            return get_dir(path).files[filename];\n        } else {\n            throw 'file does not exist';\n        }\n    }\n    \n    this.set_file = function(path, filename, file){\n        get_dir(path).files[filename] = file;\n    }\n    \n    //add directroy\n    this.add_dir = (path,dir) => { \n        if(!get_dir(path).dirs[dir.name]){\n            get_dir(path).dirs[dir.name] = dir;\n        } else {\n            throw 'dir already exists';\n        }\n    }\n    \n    //remove file or dir\n    this.remove = (path, name, type) => {\n        if(type === 'file' && get_dir(path).files[name]){\n            delete get_dir(path).files[name];\n        } else if( type === 'dir' && get_dir(path).dirs[name] ){\n            delete get_dir(path).dirs[name];\n        } else {\n            throw 'error : does not exist';\n        }\n    }\n    \n    //get directory and file listing\n    this.get_contents = path => {\n        var directory = get_dir(path);\n        var dirs = directory.dirs;\n        var files = directory.files;\n        return Object.keys(dirs).concat(Object.keys(files));\n    }\n    \n    //get file listing\n    this.get_files = path => {\n        var directory = get_dir(path);\n        var files = directory.files;\n        return Object.keys(files);\n    }\n    \n    //get dir listing\n    this.get_dirs = path => {\n        var directory = get_dir(path);\n        var dirs = directory.dirs;\n        return Object.keys(dirs);\n    }\n    \n    //User stuff\n    this.add_user = (key, user) => { \n        root.users[key] = user;\n        var homeDir = new this.Dir(key, key, 'home');\n        homeDir.dirs = {\n            'Documents' : new this.Dir('Documents', key, 'home/' + key),\n            'Downloads' : new this.Dir('Downloads', key, 'home/' + key),\n            'Email' : new this.Dir('Email', key, 'home/' + key),\n            'Images' : new this.Dir('Images', key, 'home/' + key)\n        }\n    \n        this.add_dir('/home', homeDir); \n    }\n    \n    this.get_user = (key) => { return root.users[key]; }\n    this.set_current_user = u => { user = u } \n    this.get_current_username = () => { return user.username }\n    this.get_current_user_type = () => { return user.type }\n    \n    //return root\n    this.export = () => {\n        return root;\n    }\n    \n    //save to localStorage\n    this.save =  () => {\n        // var image = jQuery.extend(true, {}, root);\n        // image.dirs.mnt.dirs = {};\n        // localStorage.setItem('fs.' + this.name , JSON.stringify(image));\n        \n        // if(boss.mounts){\n        //     boss.mounts.forEach(function(mount){\n        //         //console.log(root.dirs['mnt'].dirs[mount].dirs['root']);\n        //         localStorage.setItem('fs.' + mount , JSON.stringify(root.dirs['mnt'].dirs[mount].dirs['root']));\n        //     });  \n        // }\n    }\n    root = r;\n    //zero out mnt dir\n    root.dirs.mnt.dirs = {};\n})",
                  "owner": "root",
                  "created": 1478463134420,
                  "parent": "FileSystem"
                }
              },
              "name": "src",
              "parent": "FileSystem",
              "owner": "root",
              "created": 1478463134419
            }
          },
          "files": {},
          "name": "FileSystem",
          "parent": "sys",
          "owner": "root",
          "created": 1478463134419
        }
      },
      "files": {},
      "name": "sys",
      "parent": "root",
      "owner": "root",
      "created": 1478463134419
    },
    "tmp": {
      "dirs": {},
      "files": {},
      "name": "tmp",
      "parent": "root",
      "owner": "root",
      "created": 1478463134420
    },
    "var": {
      "dirs": {},
      "files": {},
      "name": "var",
      "parent": "root",
      "owner": "root",
      "created": 1478463134421
    }
  },
  "files": {
    "users.json": {
      "data": "{\"root\":{\"username\":\"root\",\"type\":\"root\",\"password\":\"3433489\"}}",
      "owner": "root",
      "created": 1478463134420,
      "parent": null
    }
  },
  "name": "root",
  "parent": null,
  "owner": "root",
  "created": 1478463134394
}

try{
	module.exports = JSON_IMAGE;
} catch(err){
	//do nothing, assuming the file is being run in a browser
}