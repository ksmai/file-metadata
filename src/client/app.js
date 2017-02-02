(function() {
  'use strict';
  const app = angular.module('file-metadata', ['ng']);
  const controllers = require('./controllers');
  const directives = require('./directives');

  for(let ctrl in controllers) {
    if(controllers.hasOwnProperty(ctrl)) {
      app.controller(ctrl, controllers[ctrl]);
    }
  }

  for(let dir in directives) {
    if(directives.hasOwnProperty(dir)) {
      app.directive(dir, directives[dir]);
    }
  }
})();
