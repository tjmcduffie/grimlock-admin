/*global console, define, TMCD_IS_LINKEDIN_LOADED */
/**
 * @fileoverview Application Core.
 *
 * @author timothy.mcduffie@gmail.com (Tim McDuffie)
 */

define(['linked-in-adapter', 'router'], function(IN, router) {
  'use strict';

  var Application = function() {
    this.init_ = this.init_.bind(this);
    this.init_();
  };

  Application.prototype.linkedInLoadedTimeOut_ = null;

  Application.prototype.router = router;

  Application.prototype.uri = {
    home: '/home',
    signin: '/signin',
    rootUrl: (function() {
      return window.location.protocol + '//' + window.location.host;
    }())
  };

  Application.prototype.data = {};

  Application.prototype.init_ = function() {
    if (!this.checkLinkedInApiStatus_()) {
      this.linkedInLoadedTimeOut_ = setTimeout(this.init_, 5);
      return;
    }

    clearTimeout(this.linkedInLoadedTimeOut_);
    this.authenticateOrRedirect_();
  };

  Application.prototype.checkLinkedInApiStatus_ = function() {
    return TMCD_IS_LINKEDIN_LOADED;
  };

  Application.prototype.authenticateOrRedirect_ = function() {
    var signinUrl = this.uri.rootUrl + this.uri.signin;
    var setUserData = this.setUserData_.bind(this);

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

  return Application;

});