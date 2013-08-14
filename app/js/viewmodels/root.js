/*global define */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var ko = require('lib/ko');
  var SiteModel = require('models/site');
  var UserModel = require('models/user');
  var ViewModel = require('grimlock/viewmodel');

  /** provision */
  var RootViewModel = function RootViewModel() {
    this.model.site = app.watch(new SiteModel());
    this.model.user = app.watch(new UserModel());
    this.model.profile = {
      url: app.watch("#")
    };
    app.base(this);
    this.init();
  };
  app.inherits(RootViewModel, ViewModel);

  RootViewModel.prototype.init = function(context) {
    app.base(this, 'init', context);
  };

  return RootViewModel;
});
