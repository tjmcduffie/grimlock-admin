/*global define */
define(['framework'], function(app, util, framework) {
  'use strict';

  var ViewModel = function() {
    this.routes = [];
  };

  ViewModel.routePrefix = '#';

  ViewModel.defaultRoutePath = '/';

  ViewModel.defaultMethod = 'get';

  ViewModel.prototype.init = function() {
    console.log('starting');
  };

  ViewModel.prototype.setRoute = function(method, path, callback) {
    path = path || ViewModel.defaultRoute
    this.routes.push({
      method: method,
      path: ViewModel.routePrefix + (path || ViewModel.defaultRoutePath),
      callback: callback
    });
  };

  return ViewModel;
});