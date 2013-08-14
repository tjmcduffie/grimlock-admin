// to depend on a bower installed component:
// define(['component/componentName/file'])

define(function(require) {

  /** requirements */
  var c = require('config');
  var app = require('grimlock/app');
  var LIN = require('grimlock/linkedin');
  var routes = require('grimlock/routes');

  if (!window.IN) {
    throw new Error('LinkedIn API not loaded');
  }

  /** provision */
  window.app = app;
  window.startApp = function() {
    console.log('starting App');
    routes.register();
    app.start();
  };

  window.IN.init({
    api_key: app.config.IN.API_KEY,
    onLoad: 'window.startApp',
    authorize: app.config.IN.AUTHORIZE
  });
});
