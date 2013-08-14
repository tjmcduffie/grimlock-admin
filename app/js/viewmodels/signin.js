/*global define */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var ViewModel = require('grimlock/viewmodel');

  /** provision */
  var SigninViewModel = function() {
    app.base(this);
  };
  app.inherits(SigninViewModel, ViewModel);

  SigninViewModel.prototype.method = 'get';

  SigninViewModel.prototype.path = '/signin';

  SigninViewModel.prototype.init = function(context) {
    console.log('initializing');
    app.base(this, 'init', context);
  };

  return SigninViewModel;
});