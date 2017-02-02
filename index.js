'use strict';

const config = require('./config.json');
const server = require('./src/server/server');
const PORT = process.env.PORT || config.PORT || 3000;

server.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
  console.log(`PID ${process.pid}`);
});
