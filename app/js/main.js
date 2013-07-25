// to depend on a bower installed component:
// define(['component/componentName/file'])

define(function(require) {

  /** requirements */
  var c = require('config');
  var app = require('grimlock/app');
  var routes = require('routes');

  /** provision */
  window.app = app;
  //app.init();
});
