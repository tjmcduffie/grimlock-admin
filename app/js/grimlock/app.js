/*global console, define, TMCD_IS_LINKEDIN_LOADED */
/**
 * @fileoverview Application Core.
 *
 * @author timothy.mcduffie@gmail.com (Tim McDuffie)
 */

define(function(require) {

  /** requirements */
  var IN = require('grimlock/linkedin');
  var router = require('router');
  var tpl = require('templates');
  var ko = require('ko');

  /** provision */
  var Application = function() {
    this.init = this.init.bind(this);
  };

  Application.prototype.linkedInLoadedTimeOut_ = null;

  Application.prototype.router = router();

  Application.prototype.uri = {
    home: '#/home',
    signin: '#/signin',
    root: '#/'
  };

  Application.prototype.data = {};

  Application.prototype.tpl = tpl;

  Application.prototype.init = function() {
    if (!this.checkLinkedInApiStatus_()) {
      this.linkedInLoadedTimeOut_ = setTimeout(this.init, 5);
      return;
    }

    clearTimeout(this.linkedInLoadedTimeOut_);
    this.authenticateOrRedirect_();
  };

  Application.prototype.watch = function(prop, thisObj) {
    if (typeof prop !== 'function' && !Array.isArray(prop)) {
      // not a function or array
      return ko.observable(prop);
    } else if (Array.isArray(prop)) {
      // array
      return ko.observableArray(prop);
    } else {
      // function
      return ko.computed(prop, thisObj);
    }
  };

  Application.prototype.checkLinkedInApiStatus_ = function() {
    return TMCD_IS_LINKEDIN_LOADED;
  };

  Application.prototype.authenticateOrRedirect_ = function() {
    var signinUrl = this.uri.rootUrl + this.uri.signin;
    var setUserData = this.setUserData_.bind(this);

    this.router.run(this.uri.root);

    if (!IN.isAuthorized()) {
      if (window.location.href !== signinUrl) {
        window.location = signinUrl;
      }
    }

    IN.auth().then(function() {
      if (window.location.href === signinUrl) {
        window.location = this.uri.rootUrl + this.uri.home;
      }
      IN.getUser().then(function(data) {
        if (data.values && data.values[0]) {
          setUserData(data);
          console.log('USER:', data.values[0]);
        } else {
          throw new Error("unexpected data format from IN API")
        }
      });
    });
  };

  Application.prototype.setUserData_ = function(data) {
    this.data.user = data;
    console.log(this.data);
  };

  return new Application();

});