/*global define */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var ko = require('ko');

  /** provision */

  var ViewModel = function() {
    this.setRoute_();
    ko.applyBindings(this.model);
  };

  ViewModel.prototype.routePrefix_ = '#';

  ViewModel.prototype.defaultRoutePath_ = '/';

  ViewModel.prototype.defaultMethod_ = 'get';

  ViewModel.prototype.model = {};

  ViewModel.prototype.setRoute_ = function() {
    if (!this.path) {
      return;
    }

    var method = this.method || this.defaultMethod_;
    var path = this.routePrefix_ + this.path;

    app.router[method](path, this.init.bind(this));
  };

  ViewModel.prototype.init = function(context) {
    console.log('starting');
    console.log('Sammy context:', context);
  };

  return ViewModel;
});