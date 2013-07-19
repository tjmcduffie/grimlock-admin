// to depend on a bower installed component:
// define(['component/componentName/file'])

define(['config', 'app', 'routes'], function(c, app, routes) {

  window.app = app;
  app.init();
});
