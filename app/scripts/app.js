/*global define, TMCD_IS_LINKEDIN_LOADED */
define(['linked-in-adapter'], function(IN) {
  'use strict';
  var app = app || {};

  var linkedInLoadedTimeOut_;

  app.uri = {
    home: '/index.html',

    signin: '/signin.html',

    rootUrl: (function() {
      return window.location.protocol + '//' + window.location.host;
    }())
  };

  app.init = function() {
    if (!app.checkLinkedInApiStatus_()) {
      linkedInLoadedTimeOut_ = setTimeout(function() {
        app.init();
        return;
      }, 5);
      return;
    }

    clearTimeout(linkedInLoadedTimeOut_);
    app.getUser();
  };

  app.checkLinkedInApiStatus_ = function() {
    return TMCD_IS_LINKEDIN_LOADED;
  };

  app.getUser = function() {
    var signinUrl = app.uri.rootUrl + app.uri.signin;

    if (!IN.isAuthorized()) {
      if (window.location.href !== signinUrl) {
        window.location = signinUrl;
      }
    }

    IN.auth().then(function() {
      if (window.location.href === signinUrl) {
        window.location = app.uri.rootUrl + app.uri.home;
      }
      IN.getUser().then(function(data) {
        console.log('USER:', data);
      });
    });
  };

  return app;
});
