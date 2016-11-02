//This script is used to create the dir strcuture from
//a boss image for development
var _ = require('lodash');
var fs = require('fs-extra');
var root = require(process.argv[2]);

//console.log(root);
var cwd = process.cwd();
createDir(root, cwd + '/');

//recursive function to create dir structure
function createDir(dir, path){
    
    var dirPath = path + dir['name']
    fs.mkdirsSync(dirPath);
    var dirs = dir['dirs'];
    var files = dir['files'];

    _.each(dirs, function(child, key){
        createDir(child, dirPath + '/');
    });

    _.each(files, function(file, name){
        createFile(file['data'], dirPath, name);
    });
}

//this will need to be fixed later to not create an extra dir
function createFile(file, path, name){
    fs.writeFileSync(path + '/' + name, file);
}