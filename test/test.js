'use strict';

var TestClient = require('./TestClient.js');
var Boss = require('../src/js/boss.js');
var image = require('../build/image.js');
var should = require('should');

var boss = new Boss(image, 'main');
var client = new TestClient(boss);
client.exec('root');
client.exec('pass');

describe('Boss', function () {
  console.log('test');
  describe('about', function () {
    it('return system info', function () {
        client.exec('about');
        client.lastLog.should.be.exactly('copyright 2016');
    });
  });

  describe('adduser', function () {
    it('add new user', function () {
        client.exec('adduser');
        client.lastLog.should.be.exactly('error: not enough arguments');
        client.exec('adduser testuser test password');
        client.lastLog.should.be.exactly('error : invalid type test'); 
        client.exec('adduser testuser user password');
        client.lastLog.should.be.exactly(''); 
    });
  });

  describe('cd', function () {
    it('should change dir', function () {
        client.exec('cd');
        client.lastLog.should.be.exactly('error: no directory argument');
        client.exec('cd ..');
        client.lastLog.should.be.exactly('');
        client.exec('cd /');
        client.lastLog.should.be.exactly('');
        client.exec('cd bin');
        client.lastLog.should.be.exactly('');
        //TODO more types of paths
    });
  });

  describe('cp', function () {
    it('should copy file/dir', function () {
        client.exec('cd /bin');
        client.exec('cp');
        client.lastLog.should.be.exactly('error: no file argument');
        client.exec('cp about/src/index.js about/src/test.js');
        client.lastLog.should.be.exactly('');
    });
  });

  describe('echo', function () {
    it('should print to console', function () {
        client.exec('echo test');
        client.lastLog.should.be.exactly('test');
    });
  });

  describe('exit', function () {
    it('should pop interpreter', function () {
        client.exec('exit');
        client.lastLog.should.be.exactly('');
        //TODO test this

        //log back index
        client.exec('root');
        client.exec('pass');
    });
  });

  describe('inspect', function () {
    it('should return boss object', function (){
         //TODO
    });
  });

  describe('js', function () {
    it('should evaluate javascript', function () {
        client.exec('cd ~');
        client.exec('write test.js 2+2');
        client.exec('js test.js');
        client.lastLog.should.be.exactly(4);
    });
  });

  describe('logout', function () {
    it('should logout user', function () {
        //TODO
    });
  });

  describe('ls', function () {
    it('should return list of directories', function () {
        client.exec('ls');
        client.lastLog.split('\n')[0].should.be.exactly('Apps');
    });
  });

  describe('mkdir', function () {
    it('should create new dir', function () {
        client.exec('mkdir');
        client.lastLog.should.be.exactly('error: no dir argument');
        client.exec('mkdir test');
        client.lastLog.should.be.exactly('');
    });
  });

  describe('mv', function () {
    it('should move dir/file', function () {
        client.exec('mv');
        client.lastLog.should.be.exactly('error: no file argument');
        client.exec('mv test.js Documents/test.js');
        client.lastLog.should.be.exactly('');
        //TODO some errors moving files to dirs
    });
  });

  describe('read', function () {
    it('should print file', function () {
        client.exec('read');
        client.lastLog.should.be.exactly('error: no file argument');
        client.exec('read Documents/test.js');
        client.lastLog.should.be.exactly('2+2');
    });
  });

  describe('rm', function () {
    it('should remove file/dir', function () {
        client.exec('cd ~');
        client.exec('rm');
        client.lastLog.should.be.exactly('error: no file/dir argument');
        client.exec('rm Documents');
        client.lastLog.should.be.exactly('');
    });
  });

  describe('rmuser', function () {
    it('should remove user', function () {
        client.exec('rmuser');
        //TODO
    });
  });

  describe('write', function () {
    it('should write to file', function () {
        client.exec('write');
        client.lastLog.should.be.exactly('error: no file argument');
        client.exec('write test2.js');
        client.lastLog.should.be.exactly('');//creates empty file
        client.exec('write test2.js 3+3');
        client.lastLog.should.be.exactly('');
    });
  });

});