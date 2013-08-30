// to depend on a bower installed component:
// define(['component/componentName/file'])

define([
    'viewmodels/root',
    'viewmodels/home',
    'viewmodels/sync',
    // 'viewmodels/error',    'viewmodels/signin',
  ], function(a, b) {

  var routes = arguments;

  return {
    register: function() {
      Array.prototype.forEach.call(routes, function(ViewModel) {
        new ViewModel();
      });
    }
  }
});
