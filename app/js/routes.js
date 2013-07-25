// to depend on a bower installed component:
// define(['component/componentName/file'])

define([
    'viewmodels/root',
    'viewmodels/linkedin',
    // 'viewmodels/error',    'viewmodels/signin',
  ], function() {

  return function() {
    Array.prototype.forEach.call(arguments, function(ViewModel) {
      console.log(ViewModel.prototype.constructor.name)
      var vm = new ViewModel();
    });
  }
});
