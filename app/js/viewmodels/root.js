/*global define */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var util = require('grimlock/util');
  var ViewModel = require('viewmodels/viewmodel');

  /** provision */
  function RootViewModel() {
    this.model.site = {
      title: app.watch('Grimlock Admin'),
      copyright: app.watch('&copy; ' + new Date().getFullYear())
    };
    this.model.profile = {
      url: app.watch("#")
    };
    util.base(this);
    this.init();
  };
  util.inherits(RootViewModel, ViewModel);

  RootViewModel.prototype.init = function(context) {
    console.log('initializing');
    util.base(this, 'init', context);
  };

  return RootViewModel;
});
