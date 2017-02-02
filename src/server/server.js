'use strict';

const api = require('./api');
const express = require('express');
const path = require('path');

const BIN_PATH = path.join(__dirname, '../../bin');
const ASSET_PATH = path.join(__dirname, '../../asset');

const app = express();
app.use(express.static(BIN_PATH));
app.use(express.static(ASSET_PATH));
app.use('/api', api);
app.get('/*', function(req, res) {
  res.sendFile('index.html', {
    root: BIN_PATH
  });
});

app.use(function(err, req, res, next) {
  res.status(500).end();
});

module.exports = app;
