/*global console, define, TMCD_IS_LINKEDIN_LOADED */
/**
 * @fileoverview Application Core.
 *
 * @author timothy.mcduffie@gmail.com (Tim McDuffie)
 */

define(['linked-in-adapter', 'router', 'config'], function(IN, router) {
  'use strict';

  var Application = function() {
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

  Application.prototype.user = null;

  Application.prototype.init_ = function() {
    var cb = this.init_.bind();
    if (!this.checkLinkedInApiStatus_()) {
      this.linkedInLoadedTimeOut_ = setTimeout(function() {
        app.init_();
        return;
      }, 5);
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
        console.log('USER:', data);
        this.user = data;
      });
    });
  };

  return Application;

});