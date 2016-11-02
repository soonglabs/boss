//This script is used to convert a dir structure to
//a json file
var _ = require('lodash');
var fs = require('fs-extra');
var rootDir = process.argv[2];

var image = createJDir(rootDir, 'root', null);
writeJSONFile(image);

function createJDir(path, name, parent){
    
    var jdir = {'dirs':{},'files':{}};
    jdir['name'] = name;
    jdir['parent'] = parent;
    jdir['owner'] = 'root';
    jdir['created'] = Date.now();
    
    var dir = fs.readdirSync(path);

   _.each(dir, function(child){
       if(fs.lstatSync(path + '/' + child).isDirectory()){
           jdir['dirs'][child] = createJDir(path + '/' + child, child, name);
       }

       if(fs.lstatSync(path + '/' + child).isFile()){
           jdir['files'][child] = {};
           jdir['files'][child]['data'] = createJFile(path + '/' + child);
           jdir['files'][child]['owner'] = 'root';
           jdir['files'][child]['created'] = Date.now();
           jdir['files'][child]['parent'] = parent;
       }
   }); 

   return jdir   
}

function createJFile(path){
    return fs.readFileSync(path, 'utf8');
}

function writeJSONFile(json){
    var data = "'use strict'\n\nvar JSON_IMAGE =" + JSON.stringify(json, null, 2);
    fs.writeFileSync('./build/image.js', data, 'utf-8');
}