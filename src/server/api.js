'use strict';

const express = require('express');
const multer = require('multer');
const path = require('path');
const UPLOAD_PATH = path.join(__dirname, '../../uploads');
const upload = multer({ dest: UPLOAD_PATH });

const api = express.Router();
api.post('/upload', upload.single('file'), function(req, res) {
  res.json({
    file: req.file,
    body: req.body
  });
});

api.use(function(err, req, res, next) {
  res.status(500).end();
});

module.exports = api;
