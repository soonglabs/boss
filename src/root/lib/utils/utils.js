({
    calcAbsPath : (arg, args, client) => {
        var path = client.cwd;
        if(arg && arg.startsWith('/')){
            path = arg;
        } else if(arg && arg.startsWith('~')){
            path = '/home/' + client.user.username + arg.slice(1);
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
    splitPathFilename : (full, client) => {
        var path = client.cwd;
        var name = full;
        var parts = full.split('/');
        if(parts.length > 1){
            name = parts.pop();
            path = boss.lib.utils.calcAbsPath(parts.join('/'), null, client);
        }
        return {
            path: path,
            name: name
        }
    },
    //credit: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    hashCode : (string) => {
        var hash = 0;
        if(string.length == 0){
            return hash;
        }

        for(var i = 0; i < string.length; i++) {
            var char = string.charCodeAt(i);
            var hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
})
