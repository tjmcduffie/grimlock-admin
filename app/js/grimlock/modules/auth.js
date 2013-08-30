/*global define */
define(function(require) {

  /** requirements */
  var util = require('grimlock/util');

  /** provision */
  var Authenticator = function() {
    this.refreshSession_ = this.refreshSession_.bind(this);
    this.refreshSession_();
  };

  Authenticator.prototype.refreshSession_ = function() {
    var min30 = 1800000;
    setTimeout(function() {
      IN.User.refresh();
      this.refreshSession_();
    }, min30);
  };

  Authenticator.prototype.isAuthorized = function() {
    return IN.User.isAuthorized();
  };

  Authenticator.prototype.authorize = function(callback, scope) {
    IN.Event.on(IN, 'auth', callback, scope);
    return IN.UI.Authorize().place();
  };

  Authenticator.prototype.logout = function() {
    return IN.User.logout();
  };

  return Authenticator;
});