// to depend on a bower installed component:
// define(['component/componentName/file'])

define([
    'viewmodels/error',    'viewmodels/signin',     'viewmodels/home'
  ], function() {

  Array.prototype.forEach.call(arguments, function(ViewModel) {
    var vm = new ViewModel();
  });
});
