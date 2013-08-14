/*global define, window */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var ViewModel = require('grimlock/viewmodel');

  /** provision */
  var ErrorViewModel = function() {
    app.base(this);
  };
  app.inherits(ErrorViewModel, ViewModel);

  ErrorViewModel.prototype.method = 'get';

  ErrorViewModel.prototype.path = '/error';

  ErrorViewModel.prototype.init = function(context) {
    console.log('initializing');
    app.base(this, 'init', context);
  };

  return ErrorViewModel;
});