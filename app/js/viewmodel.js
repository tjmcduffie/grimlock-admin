/*global define */
define(['app', 'framework'], function(app, framework) {

  var ViewModel = function() {
    this.setRoute_();
  };

  ViewModel.prototype.routePrefix_ = '#';

  ViewModel.prototype.defaultRoutePath_ = '/';

  ViewModel.prototype.defaultMethod_ = 'get';

  ViewModel.prototype.init = function(context) {
    console.log('starting');
    console.log('Sammy context:', context);
  };

  ViewModel.prototype.setRoute_ = function(method, path, callback) {
    var method = this.method || this.defaultMethod_;
    var path = this.routePrefix_ + (this.path || this.defaultRoutePath_);

    app.router[method](path, this.init.bind(this));
  };

  return ViewModel;
});