'use strict'

var JSON_IMAGE ={
  "dirs": {
    "app": {
      "dirs": {
        "edit": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\r\n    'use strict';\r\n\r\n     var filename;\r\n\r\n     if(args.length > 1){\r\n        var result = boss.lib.utils.splitPathFilename(args[1], client);\r\n        var path = result.path;\r\n        filename = result.name;\r\n     }\r\n\r\n    if(filename){\r\n\r\n        var template = \"<div id='editor'></div>\";\r\n        var vm = new boss.lib.VueApp(template, {\r\n            el: '#editor'\r\n        });\r\n\r\n        vm.change = false;\r\n        vm.editor = ace.edit('editor');\r\n        vm.editor.$blockScrolling = Infinity;\r\n        vm.editor.setTheme('ace/theme/monokai');\r\n        vm.editor.getSession().setMode('ace/mode/javascript');\r\n        vm.editor.getSession().setValue(boss.fs.get_file(path,filename));\r\n\r\n        //on editor change\r\n        vm.editor.on('change', function(data){\r\n            vm.change = true;\r\n        });\r\n\r\n        //on save\r\n        $(vm.$el).keydown(function(e) {\r\n            if(e.keyCode === 83 && e.ctrlKey && e.shiftKey){\r\n                vm.change = false;\r\n                boss.fs.set_file(path, filename, vm.editor.getSession().getValue(), client.user);\r\n            }\r\n        });\r\n\r\n        //on exit\r\n        $(vm.$el).keydown(function(e) {\r\n            if(e.keyCode === 27 && vm.change){\r\n                var c = confirm('You have unsaved changes. Would you like to exit?');\r\n                if(c){\r\n                    $(vm.$el).remove();\r\n                }\r\n            } else if(e.keyCode === 27 ){\r\n                $(vm.$el).remove();\r\n            }\r\n        });\r\n\r\n    } else if(!filename) {\r\n        boss.lib.print.error('error: no file argument');\r\n    }\r\n});",
                  "owner": "root",
                  "created": 1479173925823,
                  "parent": "edit"
                }
              },
              "name": "src",
              "parent": "edit",
              "owner": "root",
              "created": 1479173925822
            }
          },
          "files": {},
          "name": "edit",
          "parent": "app",
          "owner": "root",
          "created": 1479173925822
        },
        "shell": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args){\r\n    'use strict';\r\n\r\n    var client = new boss.lib.TerminalClient(boss);\r\n    var template = '<div class=\"shell\"></div>';\r\n\r\n    var vm = new boss.lib.VueApp(template, {\r\n        el: '.shell'\r\n    });\r\n\r\n    $(vm.$el).terminal(client.exec, {\r\n        greetings: '',\r\n        name: boss.fs.name,\r\n        prompt: name + ': username$ '\r\n    });\r\n});",
                  "owner": "root",
                  "created": 1479173925824,
                  "parent": "shell"
                }
              },
              "name": "src",
              "parent": "shell",
              "owner": "root",
              "created": 1479173925823
            }
          },
          "files": {},
          "name": "shell",
          "parent": "app",
          "owner": "root",
          "created": 1479173925823
        }
      },
      "files": {},
      "name": "app",
      "parent": "root",
      "owner": "root",
      "created": 1479173925822
    },
    "bin": {
      "dirs": {
        "about": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.lib.print.log(\"[[;green;] ___  ___  ___  ___ ]\", client);\n    boss.lib.print.log(\"[[;green;]| . >| . |\\/ __>\\/ __>]\", client);\n    boss.lib.print.log(\"[[;green;]| . \\\\| | |\\\\__ \\\\\\\\__ \\\\]\", client);\n    boss.lib.print.log(\"[[;green;]|___\\/`___'<___\\/<___\\/]\", client);\n    boss.lib.print.log(\"Browser Operating System Simulator - 0.0.1\", client);\n    boss.lib.print.log(\"created by Scott Russell\", client);\n    boss.lib.print.log(\"copyright 2016\", client);\n})",
                  "owner": "root",
                  "created": 1479173925825,
                  "parent": "about"
                }
              },
              "name": "src",
              "parent": "about",
              "owner": "root",
              "created": 1479173925824
            }
          },
          "files": {},
          "name": "about",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925824
        },
        "adduser": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length < 4){\n        boss.lib.print.error('error: not enough arguments', client);\n    } else if(args[2] !== 'root' && args[2] !== 'user') {\n        boss.lib.print.error('error : invalid type ' + args[2], client);\n    } else {\n        boss.fs.add_user(args[1], new boss.fs.User(args[1], args[2], boss.lib.utils.hashCode(args[3])));\n    }\n})",
                  "owner": "root",
                  "created": 1479173925826,
                  "parent": "adduser"
                }
              },
              "name": "src",
              "parent": "adduser",
              "owner": "root",
              "created": 1479173925825
            }
          },
          "files": {},
          "name": "adduser",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925825
        },
        "cd": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args[1]){\n        try{\n            var path = boss.lib.utils.calcAbsPath(args[1], null, client);\n           client.cwd = path;\n            var list = path.split('/');\n            boss.lib.set_prompt((list.length <= 1 ? '' : list[list.length - 1]), client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!args[1]){\n        boss.lib.print.error('error: no directory argument', client);\n    }\n})",
                  "owner": "root",
                  "created": 1479173925827,
                  "parent": "cd"
                }
              },
              "name": "src",
              "parent": "cd",
              "owner": "root",
              "created": 1479173925826
            }
          },
          "files": {},
          "name": "cd",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925826
        },
        "cp": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1], client);\n        var path = result.path;var filename = result.name;\n    }\n\n    if(args.length > 2){\n        var result2 = boss.lib.utils.splitPathFilename(args[2], client);\n        var path2 = result2.path;var filename2 = result2.name;\n    }\n\n    if(filename){\n        try{\n            var data = boss.fs.get_file(path, filename);\n            boss.fs.set_file(path2, filename2, data, client.user);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client);\n    }\n});",
                  "owner": "root",
                  "created": 1479173925827,
                  "parent": "cp"
                }
              },
              "name": "src",
              "parent": "cp",
              "owner": "root",
              "created": 1479173925827
            }
          },
          "files": {},
          "name": "cp",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925827
        },
        "echo": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.lib.print.log(args[1], client);\n})",
                  "owner": "root",
                  "created": 1479173925828,
                  "parent": "echo"
                }
              },
              "name": "src",
              "parent": "echo",
              "owner": "root",
              "created": 1479173925828
            }
          },
          "files": {},
          "name": "echo",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925828
        },
        "edit": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\r\n    boss.app.edit(args, client);\r\n});",
                  "owner": "root",
                  "created": 1479173925829,
                  "parent": "edit"
                }
              },
              "name": "src",
              "parent": "edit",
              "owner": "root",
              "created": 1479173925829
            }
          },
          "files": {},
          "name": "edit",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925829
        },
        "exit": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.lib.pop();\n});",
                  "owner": "root",
                  "created": 1479173925830,
                  "parent": "exit"
                }
              },
              "name": "src",
              "parent": "exit",
              "owner": "root",
              "created": 1479173925830
            }
          },
          "files": {},
          "name": "exit",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925830
        },
        "export": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    \n    $('body').append(\"<a id='downloadAnchorElem' style='display:none'></a>\");\n    \n    var json = JSON.stringify(boss.fs.export());\n    var dataStr = \"data:text/json;charset=utf-8,\" + encodeURIComponent(json);\n    var dlAnchorElem = document.getElementById('downloadAnchorElem');\n    dlAnchorElem.setAttribute(\"href\",     dataStr     );\n    dlAnchorElem.setAttribute(\"download\", \"boss.json\");\n    dlAnchorElem.click();\n    \n    $('#downloadAnchorElem').remove();\n})",
                  "owner": "root",
                  "created": 1479173925831,
                  "parent": "export"
                }
              },
              "name": "src",
              "parent": "export",
              "owner": "root",
              "created": 1479173925830
            }
          },
          "files": {},
          "name": "export",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925830
        },
        "inspect": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    console.log(boss);\n})",
                  "owner": "root",
                  "created": 1479173925831,
                  "parent": "inspect"
                }
              },
              "name": "src",
              "parent": "inspect",
              "owner": "root",
              "created": 1479173925831
            }
          },
          "files": {},
          "name": "inspect",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925831
        },
        "js": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1], client);\n        var path = result.path;\n        var name = result.name;\n    }if(name){\n        try{\n            boss.lib.print.log(eval(boss.fs.get_file(path, name)), client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!name) {\n        boss.lib.print.error('error: no file argument', client);\n    }\n})",
                  "owner": "root",
                  "created": 1479173925832,
                  "parent": "js"
                }
              },
              "name": "src",
              "parent": "js",
              "owner": "root",
              "created": 1479173925832
            }
          },
          "files": {},
          "name": "js",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925832
        },
        "logout": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    client.set_prompt('username:');\n    boss.lib.pop();\n})",
                  "owner": "root",
                  "created": 1479173925833,
                  "parent": "logout"
                }
              },
              "name": "src",
              "parent": "logout",
              "owner": "root",
              "created": 1479173925832
            }
          },
          "files": {},
          "name": "logout",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925832
        },
        "ls": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    'use strict';\n    var str = '';\n    var path = boss.lib.utils.calcAbsPath(args[1], args, client);\n    var list = boss.fs.get_contents(path);\n    for(var i in list){\n        str += list[i] + '\\n';\n    }\n    str = str.substring(0, str.length-1);\n    boss.lib.print.log(str, client);\n});",
                  "owner": "root",
                  "created": 1479173925833,
                  "parent": "ls"
                }
              },
              "name": "src",
              "parent": "ls",
              "owner": "root",
              "created": 1479173925833
            }
          },
          "files": {},
          "name": "ls",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925833
        },
        "mkdir": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\r\n\r\n    if(args.length > 1){\r\n        var result = boss.lib.utils.splitPathFilename(args[1], client);\r\n        var path = result.path;\r\n        var dirname = result.name;\r\n    }\r\n\r\n    if(dirname){\r\n        try{\r\n            boss.fs.set_dir(path, dirname, client.user);\r\n        } catch(err){\r\n            boss.lib.print.error('error : ' + err, client);\r\n        }\r\n    } else if(!dirname) {\r\n        boss.lib.print.error('error: no dir argument', client);\r\n    }\r\n});",
                  "owner": "root",
                  "created": 1479173925834,
                  "parent": "mkdir"
                }
              },
              "name": "src",
              "parent": "mkdir",
              "owner": "root",
              "created": 1479173925834
            }
          },
          "files": {},
          "name": "mkdir",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925834
        },
        "mv": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1], client);\n        var path = result.path;\n        var filename = result.name;\n    }if(args.length > 2){\n        var result2 = boss.lib.utils.splitPathFilename(args[2], client);\n        var path2 = result2.path;\n        var filename2 = result2.name;\n    }if(filename){\n        try{\n            var data = boss.fs.get_file(path, filename);\n            boss.fs.set_file(path2, filename2, data, client.user);\n            boss.fs.remove(path, filename, 'file', client.user);\n        } catch(err){\n                boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client);\n    }\n});",
                  "owner": "root",
                  "created": 1479173925835,
                  "parent": "mv"
                }
              },
              "name": "src",
              "parent": "mv",
              "owner": "root",
              "created": 1479173925835
            }
          },
          "files": {},
          "name": "mv",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925835
        },
        "read": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1], client);\n        var path = result.path;\n        var filename = result.name;\n    }\n\n    if(filename){\n        try{\n            boss.lib.print.log(boss.fs.get_file(path, filename), client);\n        } catch(err){\n            boss.lib.print.error('error : ' + err, client);\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client);\n    }\n});",
                  "owner": "root",
                  "created": 1479173925836,
                  "parent": "read"
                }
              },
              "name": "src",
              "parent": "read",
              "owner": "root",
              "created": 1479173925836
            }
          },
          "files": {},
          "name": "read",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925836
        },
        "reload": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    boss.reload();\n    boss.cmd.logout('', client);\n})",
                  "owner": "root",
                  "created": 1479173925837,
                  "parent": "reload"
                }
              },
              "name": "src",
              "parent": "reload",
              "owner": "root",
              "created": 1479173925836
            }
          },
          "files": {},
          "name": "reload",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925836
        },
        "rm": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1], client);\n        var path = result.path;\n        var name = result.name;\n    }\n\n    if(name){\n        try{\n            boss.fs.remove(path, name, 'file', client.user);\n        } catch(err){\n            //error('error : ' + err);\n        }\n        try{boss.fs.remove(path, name, 'dir', client.user);\n        } catch(err){\n            //error('error : ' + err);\n        }\n    } else if(!name) {\n        boss.lib.print.error('error: no file/dir argument', client);\n    }\n});",
                  "owner": "root",
                  "created": 1479173925837,
                  "parent": "rm"
                }
              },
              "name": "src",
              "parent": "rm",
              "owner": "root",
              "created": 1479173925837
            }
          },
          "files": {},
          "name": "rm",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925837
        },
        "rmuser": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "",
                  "owner": "root",
                  "created": 1479173925838,
                  "parent": "rmuser"
                }
              },
              "name": "src",
              "parent": "rmuser",
              "owner": "root",
              "created": 1479173925838
            }
          },
          "files": {},
          "name": "rmuser",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925838
        },
        "tab": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\r\n    'use strict';\r\n    var newClient = new boss.lib.TerminalClient(boss);\r\n    newClient.user = client.user;\r\n    newClient.cwd = client.cwd;\r\n\r\n    var config = {\r\n        title: 'shell',\r\n        type: 'component',\r\n        componentName: 'shell',\r\n        componentState: {}\r\n    };\r\n\r\n    boss.layout.root.contentItems[0].addChild(config);\r\n\r\n    $('.shell').terminal(newClient.exec, {\r\n        greetings: '',\r\n        name: boss.fs.name,\r\n        prompt: client.get_prompt()\r\n    });\r\n});",
                  "owner": "root",
                  "created": 1479173925839,
                  "parent": "tab"
                }
              },
              "name": "src",
              "parent": "tab",
              "owner": "root",
              "created": 1479173925839
            }
          },
          "files": {},
          "name": "tab",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925839
        },
        "write": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client){\n    if(args.length > 1){\n        var result = boss.lib.utils.splitPathFilename(args[1], client);\n        var path = result.path;\n        var filename = result.name;\n    }\n\n    if(filename){\n        try{\n            boss.fs.get_file(path, filename) = args[2] ? args[2] : '';\n        } catch(err){\n            try{\n                boss.fs.set_file(path, filename, args[2] ? args[2] : '', client.user);\n            } catch(err){\n                boss.lib.print.error('error : ' + err, client);\n            }\n        }\n    } else if(!filename) {\n        boss.lib.print.error('error: no file argument', client); \n    }\n});",
                  "owner": "root",
                  "created": 1479173925840,
                  "parent": "write"
                }
              },
              "name": "src",
              "parent": "write",
              "owner": "root",
              "created": 1479173925839
            }
          },
          "files": {},
          "name": "write",
          "parent": "bin",
          "owner": "root",
          "created": 1479173925839
        }
      },
      "files": {},
      "name": "bin",
      "parent": "root",
      "owner": "root",
      "created": 1479173925824
    },
    "etc": {
      "dirs": {},
      "files": {},
      "name": "etc",
      "parent": "root",
      "owner": "root",
      "created": 1479173925840
    },
    "home": {
      "dirs": {
        "root": {
          "dirs": {
            "Apps": {
              "dirs": {},
              "files": {},
              "name": "Apps",
              "parent": "root",
              "owner": "root",
              "created": 1479173925841
            },
            "Documents": {
              "dirs": {},
              "files": {
                "README.txt": {
                  "data": "Welcome to Boss\r\n\r\nMore to come later.",
                  "owner": "root",
                  "created": 1479173925841,
                  "parent": "root"
                }
              },
              "name": "Documents",
              "parent": "root",
              "owner": "root",
              "created": 1479173925841
            },
            "Downloads": {
              "dirs": {},
              "files": {},
              "name": "Downloads",
              "parent": "root",
              "owner": "root",
              "created": 1479173925842
            },
            "Images": {
              "dirs": {},
              "files": {},
              "name": "Images",
              "parent": "root",
              "owner": "root",
              "created": 1479173925842
            }
          },
          "files": {},
          "name": "root",
          "parent": "home",
          "owner": "root",
          "created": 1479173925841
        }
      },
      "files": {},
      "name": "home",
      "parent": "root",
      "owner": "root",
      "created": 1479173925841
    },
    "lib": {
      "dirs": {
        "App": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(args, client, config){\n    \n    this.config = config;\n    \n    //add template to body        \n    $('body').append(config.template);\n    \n    //add css\n    var target = $(config.selector);\n    target.attr(\"style\", target.attr(\"style\") + \"; \" + config.css);\n    \n    //call controller onload\n    config.onLoad(this, args, client);\n})",
                  "owner": "root",
                  "created": 1479173925843,
                  "parent": "App"
                }
              },
              "name": "src",
              "parent": "App",
              "owner": "root",
              "created": 1479173925843
            }
          },
          "files": {},
          "name": "App",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925842
        },
        "Login": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(boss){\r\n    'use strict';\r\n    var username = false;\r\n\r\n    this.username = (command, client) => {\r\n        boss.lib.set_prompt('password', client);\r\n        username = command;\r\n        boss.lib.push(this.password);\r\n    };\r\n\r\n    this.password = (command, client) => {\r\n        var user = boss.fs.validate_user(username, boss.lib.utils.hashCode(command));\r\n        if(user){\r\n            client.user = user;\r\n            client.cwd = '/home/' + username;\r\n\r\n            boss.lib.set_prompt( username, client);\r\n            boss.lib.pop();\r\n            boss.lib.push(new boss.lib.Shell(boss).exec);\r\n            boss.cmd.about('', client);\r\n            boss.lib.print.log('Hello ' + username + '. Welcome to BOSS. Type [[;orange;]help] to see available commands.', client);\r\n         } else {\r\n            boss.lib.print.error('unknown username/password combination', client);\r\n            boss.lib.set_prompt('username', client);\r\n            boss.lib.pop();\r\n        }\r\n    };\r\n});",
                  "owner": "root",
                  "created": 1479173925844,
                  "parent": "Login"
                }
              },
              "name": "src",
              "parent": "Login",
              "owner": "root",
              "created": 1479173925843
            }
          },
          "files": {},
          "name": "Login",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925843
        },
        "pop": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(){\n    boss.interpreters.pop()\n})",
                  "owner": "root",
                  "created": 1479173925846,
                  "parent": "pop"
                }
              },
              "name": "src",
              "parent": "pop",
              "owner": "root",
              "created": 1479173925845
            }
          },
          "files": {},
          "name": "pop",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925845
        },
        "print": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "({\n    'log':function(txt, client){client.out(txt);},\n    'error':function(txt, client){client.out(txt);}\n})",
                  "owner": "root",
                  "created": 1479173925847,
                  "parent": "print"
                }
              },
              "name": "src",
              "parent": "print",
              "owner": "root",
              "created": 1479173925847
            }
          },
          "files": {},
          "name": "print",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925846
        },
        "push": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(fn){\n    boss.interpreters.push(fn)\n})",
                  "owner": "root",
                  "created": 1479173925848,
                  "parent": "push"
                }
              },
              "name": "src",
              "parent": "push",
              "owner": "root",
              "created": 1479173925847
            }
          },
          "files": {},
          "name": "push",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925847
        },
        "set_prompt": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(txt, client){\n    client.set_prompt(txt)\n})",
                  "owner": "root",
                  "created": 1479173925848,
                  "parent": "set_prompt"
                }
              },
              "name": "src",
              "parent": "set_prompt",
              "owner": "root",
              "created": 1479173925848
            }
          },
          "files": {},
          "name": "set_prompt",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925848
        },
        "Shell": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(boss){\r\n    this.exec = (command, client) => {\r\n        if (command !== '') {\r\n            var result = command;\r\n            var args = command.split(' ');\r\n            if(boss.cmd[args[0]]){\r\n                boss.cmd[args[0]](args, client);\r\n            }else if(args[0] != undefined) {\r\n                boss.lib.print.error('unknown command : ' + command, client);\r\n            }\r\n        }\r\n    } \r\n})",
                  "owner": "root",
                  "created": 1479173925849,
                  "parent": "Shell"
                }
              },
              "name": "src",
              "parent": "Shell",
              "owner": "root",
              "created": 1479173925849
            }
          },
          "files": {},
          "name": "Shell",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925848
        },
        "TerminalClient": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(boss){\r\n    'use strict'\r\n    var daBoss = boss;\r\n    var terminal;\r\n\r\n        this.out = function(text){\r\n            terminal.echo(text);\r\n        }\r\n\r\n        this.set_prompt = function(prompt){\r\n            terminal.set_prompt(daBoss.fs.name + ': ' + prompt + '$ ');\r\n        }\r\n\r\n        this.get_prompt = function(prompt){\r\n            return terminal.get_prompt();\r\n        }\r\n\r\n        this.exec = (command, term) => {\r\n            terminal = term;\r\n            daBoss.interpreters[daBoss.interpreters.length - 1](command, this);\r\n        }\r\n})",
                  "owner": "root",
                  "created": 1479173925850,
                  "parent": "TerminalClient"
                }
              },
              "name": "src",
              "parent": "TerminalClient",
              "owner": "root",
              "created": 1479173925849
            }
          },
          "files": {},
          "name": "TerminalClient",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925849
        },
        "utils": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "({\r\n    calcAbsPath : (arg, args, client) => {\r\n        var path = client.cwd;\r\n        if(arg && arg.startsWith('/')){\r\n            path = arg;\r\n        } else if(arg && arg.startsWith('~')){\r\n            path = '/home/' + client.user.username + arg.slice(1);\r\n        } else if(arg && arg === '..'){\r\n            var parts = path.split('/');\r\n            parts = parts.slice(0, parts.length - 1);\r\n            path = parts.join('/');\r\n        } else if(args && args.length >= 2 && args[1]){\r\n            path += '/' + arg;\r\n        } else if(!args){\r\n            path += '/' + arg;\r\n        }\r\n        return path;\r\n    },\r\n    splitPathFilename : (full, client) => {\r\n        var path = client.cwd;\r\n        var name = full;\r\n        var parts = full.split('/');\r\n        if(parts.length > 1){\r\n            name = parts.pop();\r\n            path = boss.lib.utils.calcAbsPath(parts.join('/'), null, client);\r\n        }\r\n        return {\r\n            path: path,\r\n            name: name\r\n        }\r\n    },\r\n    //credit: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/\r\n    hashCode : (string) => {\r\n        var hash = 0;\r\n        if(string.length == 0){\r\n            return hash;\r\n        }\r\n\r\n        for(var i = 0; i < string.length; i++) {\r\n            var char = string.charCodeAt(i);\r\n            var hash = ((hash<<5)-hash)+char;\r\n            hash = hash & hash; // Convert to 32bit integer\r\n        }\r\n        return hash;\r\n    }\r\n})\r\n",
                  "owner": "root",
                  "created": 1479173925850,
                  "parent": "utils"
                }
              },
              "name": "src",
              "parent": "utils",
              "owner": "root",
              "created": 1479173925850
            }
          },
          "files": {},
          "name": "utils",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925850
        },
        "VueApp": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function(template, config){\r\n    'use strict';\r\n    var layoutConfig = {\r\n        content: [{\r\n            type: 'row',\r\n            content: [\r\n                {\r\n                    type: 'component',\r\n                    componentName: 'shell',\r\n                    componentState: {}\r\n                }\r\n            ]\r\n        }]\r\n    };\r\n\r\n    var layout = new GoldenLayout(layoutConfig);\r\n    layout.registerComponent('shell', function( container, state ){\r\n        container.getElement().html(template);\r\n    });\r\n\r\n    layout.init();\r\n    boss.layout = layout;\r\n    return new Vue(config);\r\n});",
                  "owner": "root",
                  "created": 1479173925851,
                  "parent": "VueApp"
                }
              },
              "name": "src",
              "parent": "VueApp",
              "owner": "root",
              "created": 1479173925851
            }
          },
          "files": {},
          "name": "VueApp",
          "parent": "lib",
          "owner": "root",
          "created": 1479173925850
        }
      },
      "files": {},
      "name": "lib",
      "parent": "root",
      "owner": "root",
      "created": 1479173925842
    },
    "mnt": {
      "dirs": {},
      "files": {},
      "name": "mnt",
      "parent": "root",
      "owner": "root",
      "created": 1479173925851
    },
    "sys": {
      "dirs": {
        "FileSystem": {
          "dirs": {
            "src": {
              "dirs": {},
              "files": {
                "index.js": {
                  "data": "(function FileSystem(root, name){\r\n    'use strict';\r\n\r\n    //SYSTEM NAME\r\n    this.name = name;\r\n\r\n    //VARS\r\n    var _root = root;\r\n    _root.users = JSON.parse(_root.files['users.json'].data);\r\n\r\n    //CLASSES\r\n    this.Dir = function(name, owner, parent){\r\n        this.name = name;\r\n        this.owner = owner;\r\n        this.parent = parent;\r\n        this.created = Date.now();\r\n        this.dirs = {};\r\n        this.files = {};\r\n    };\r\n\r\n    this.File = function(owner, data, meta){\r\n        this.owner = owner;\r\n        this.created = Date.now();\r\n        this.data = data;\r\n        this.meta = meta;\r\n    };\r\n\r\n    this.User = function(username, type, password){\r\n        this.username = username;\r\n        this.type = type;\r\n        this.password = password;\r\n    };\r\n\r\n    //FUNCTIONS\r\n    var get_dir = (path) => {\r\n        var parts = path.split('/');\r\n        var directory = _root;\r\n\r\n        for(var i = 1; i < parts.length; i++){\r\n            if(parts[i] !== ''){\r\n                directory = directory.dirs[parts[i]];\r\n            }\r\n        }\r\n        return directory;\r\n    }\r\n\r\n    /**\r\n     * The fileSystem permissions system is very simple.\r\n     * If, you are a root user you can do anything. If you\r\n     * are a regular user you can read all files (it's js so\r\n     * really this can't be hidden so why fake it) but can't\r\n     * write on other users files/dirs\r\n     */\r\n    var validate = (object, user) => {\r\n        if(user.type !== 'root' &&\r\n           user.username !== object.owner &&\r\n           !this.validate_user(user.username, user.password)){\r\n            throw Error('You are not permitted to execute this action');\r\n        }\r\n    };\r\n\r\n    //METHODS\r\n    this.get_file = (path, filename) => {\r\n        if(get_dir(path).files[filename]){\r\n            var file = get_dir(path).files[filename];\r\n            return get_dir(path).files[filename].data;\r\n        } else {\r\n            throw 'file does not exist';\r\n        }\r\n    }\r\n\r\n    this.set_file = (path, filename, data, user) => {\r\n        var dir = get_dir(path);\r\n        validate(dir, user);\r\n        dir.files[filename] = new this.File(this.get_current_username, data, null);\r\n    }\r\n\r\n    this.set_dir = (path, dirname, user) => { \r\n        if(!get_dir(path).dirs[dirname]){\r\n            var dir = get_dir(path);\r\n            validate(dir, user);\r\n            dir.dirs[dirname] = new this.Dir(dirname, user ? user.username : this.get_current_username(), path);\r\n        } else {\r\n            throw 'dir already exists';\r\n        }\r\n    }\r\n\r\n    this.remove = (path, name, type, user) => {\r\n        if(type === 'file' && get_dir(path).files[name]){\r\n            var dir = get_dir(path);\r\n            validate(dir, user);\r\n            delete dir.files[name];\r\n        } else if( type === 'dir' && get_dir(path).dirs[name] ){\r\n            var dir = get_dir(path);\r\n            validate(dir);\r\n            delete dir.dirs[name];\r\n        } else {\r\n            throw 'error : does not exist';\r\n        }\r\n    }\r\n\r\n    //get directory and file listing\r\n    this.get_contents = path => {\r\n        var directory = get_dir(path);\r\n        var dirs = directory.dirs;\r\n        var files = directory.files;\r\n        return Object.keys(dirs).concat(Object.keys(files));\r\n    }\r\n\r\n    //get file listing\r\n    this.get_files = path => {\r\n        var directory = get_dir(path);\r\n        var files = directory.files;\r\n        return Object.keys(files);\r\n    }\r\n\r\n    //get dir listing\r\n    this.get_dirs = path => {\r\n        var directory = get_dir(path);\r\n        var dirs = directory.dirs;\r\n        return Object.keys(dirs);\r\n    }\r\n\r\n    //USER\r\n    this.add_user = (key, user) => {\r\n        _root.users[key] = user;\r\n        this.set_dir('/home', key, user);\r\n        this.set_dir('/home/' + key, 'Apps', user);\r\n        this.set_dir('/home/' + key, 'Documents', user);\r\n        this.set_dir('/home/' + key, 'Downloads', user);\r\n        this.set_dir('/home/' + key, 'Images', user);\r\n    }\r\n\r\n    this.remove_user = (key, user) => {\r\n       //TODO\r\n    }\r\n\r\n    this.validate_user = (name, pass) => {\r\n        if(_root.users[name] && _root.users[name].password == pass){\r\n            return _root.users[name];\r\n        }\r\n        return false;\r\n    };\r\n\r\n    //return root\r\n    this.export = () => {\r\n        return _root;\r\n    }\r\n})",
                  "owner": "root",
                  "created": 1479173925852,
                  "parent": "FileSystem"
                }
              },
              "name": "src",
              "parent": "FileSystem",
              "owner": "root",
              "created": 1479173925852
            }
          },
          "files": {},
          "name": "FileSystem",
          "parent": "sys",
          "owner": "root",
          "created": 1479173925852
        }
      },
      "files": {},
      "name": "sys",
      "parent": "root",
      "owner": "root",
      "created": 1479173925851
    },
    "tmp": {
      "dirs": {},
      "files": {},
      "name": "tmp",
      "parent": "root",
      "owner": "root",
      "created": 1479173925852
    },
    "var": {
      "dirs": {},
      "files": {},
      "name": "var",
      "parent": "root",
      "owner": "root",
      "created": 1479173925853
    }
  },
  "files": {
    "users.json": {
      "data": "{\"root\":{\"username\":\"root\",\"type\":\"root\",\"password\":\"3433489\"}}",
      "owner": "root",
      "created": 1479173925853,
      "parent": null
    }
  },
  "name": "root",
  "parent": null,
  "owner": "root",
  "created": 1479173925821
}

try{
	module.exports = JSON_IMAGE;
} catch(err){
	//do nothing, assuming the file is being run in a browser
}