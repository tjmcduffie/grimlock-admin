/*global define */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var ViewModel = require('grimlock/viewmodel');

  /** provision */
  var SyncViewModel = function SyncViewModel() {
    app.base(this);
  };
  app.inherits(SyncViewModel, ViewModel);

  SyncViewModel.prototype.method = 'get';

  SyncViewModel.prototype.path = '/sync';

  SyncViewModel.prototype.view = 'sync';

  SyncViewModel.prototype.init = function(context) {
    app.renderView(app.tmpl.sync);
    app.base(this, 'init', context);
  };

  return SyncViewModel;
});