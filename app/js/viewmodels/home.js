/*global define, window */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var ViewModel = require('grimlock/viewmodel');

  /** provision */
  var HomeViewModel = function HomeViewModel() {
    app.base(this);
  };
  app.inherits(HomeViewModel, ViewModel);

  HomeViewModel.prototype.method = 'get';

  HomeViewModel.prototype.path = '/';

  HomeViewModel.prototype.init = function(context) {
    app.renderView(app.tmpl.home);
    app.base(this, 'init', context);
  };

  return HomeViewModel;
});