/*global define */
define(['app', 'ViewModel', 'util'], function(app, ViewModel, util) {

  var ErrorViewModel = function() {
    util.base(this);
  };
  util.inherits(ErrorViewModel, ViewModel);

  ErrorViewModel.prototype.method = 'get';

  ErrorViewModel.prototype.path = '/error';

  ErrorViewModel.prototype.init = function(context) {
    console.log('initializing');
    util.base(this, 'init', context);
  };

  return ErrorViewModel;
});