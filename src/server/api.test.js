'use strict';
const superagent = require('superagent');
const express = require('express');
const assert = require('chai').assert;
const path = require('path');

const HELLO_TXT_PATH = path.join(__dirname, '../../hello.txt');
const HELLO_TXT_PROP = {
  fieldname: 'file',
  originalname: 'hello.txt',
  size: 13
};
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

describe('API', function() {
  var server;

  before(function(done) {
    const app = express();
    app.use(require('./api'));
    server = app.listen(PORT, function() {
      done();
    });
  });

  after(function(done) {
    server.close(function() {
      done();
    });
  });

  it('receives uploaded file', function(done) {
    superagent
      .post(`${BASE_URL}/upload`)
      .attach('file', HELLO_TXT_PATH)
      .end(function(err, res) {
        assert.ifError(err);
        assert.isOk(res);
        assert.property(res, 'text');
        var file;
        assert.doesNotThrow(function() {
          file = JSON.parse(res.text).file;
        });

        for(let prop in HELLO_TXT_PROP) {
          if(HELLO_TXT_PROP.hasOwnProperty(prop)) {
            assert.property(file, prop);
            assert.equal( file[prop], HELLO_TXT_PROP[prop] );
          }
        }
        
        done();
      });
  });
});
