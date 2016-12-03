//This script is used to convert a dir structure to
//a json file
var _ = require('lodash');
var fs = require('fs-extra');

function dirs2Json(rootDir, buildDir){
    var image = createJDir(rootDir, 'root', null);
    writeJSONFile(image, buildDir);
}


function createJDir(path, name, parent){

    var jdir = {'dirs': {}, 'files': {}};
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

   return jdir;
}

function createJFile(path){
    return fs.readFileSync(path, 'utf8');
}

function writeJSONFile(json, buildDir){
    var data = "'use strict';\n\nvar boss_image =" + JSON.stringify(json);
    data += '\n\ntry{\n\tmodule.exports = JSON_IMAGE;\n} catch(err){\n\t//do nothing, assuming the file is being run in a browser\n}'
    fs.writeFileSync(buildDir + '/image.js', data, 'utf-8');
}

module.exports = dirs2Json