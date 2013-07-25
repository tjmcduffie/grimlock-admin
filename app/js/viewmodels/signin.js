/*global define */
define(['grimlock/app', 'viewmodels/ViewModel', 'grimlock/util'], function(app, ViewModel, util) {

  var SigninViewModel = function() {
    util.base(this);
  };
  util.inherits(SigninViewModel, ViewModel);

  SigninViewModel.prototype.method = 'get';

  SigninViewModel.prototype.path = '/signin';

  SigninViewModel.prototype.init = function(context) {
    console.log('initializing');
    util.base(this, 'init', context);
  };

  return SigninViewModel;
});