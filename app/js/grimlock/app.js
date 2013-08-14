/*global console, define, TMCD_IS_LINKEDIN_LOADED */
/**
 * @fileoverview Application Core.
 *
 * @author timothy.mcduffie@gmail.com (Tim McDuffie)
 */

define(function(require) {

  /** requirements */
  var Auth = require('grimlock/auth');
  var LI_API = require('api/linkedin');
  var analytics = require('grimlock/analytics');
  var config = require('appconfig');
  var ko = require('lib/ko');
  var router = require('lib/router')();
  var tpl = require('templates');
  var util = require('grimlock/util');
  var tmplEngine = require('handlebars');

  /** provision */
  var Application = function() {
    this.start = this.start.bind(this);
  };

  Application.DefaultRoute = "#/";

  Application.prototype.auth = new Auth();

  Application.prototype.base = util.base;

  Application.prototype.bind = util.bind;

  Application.prototype.config = config;

  Application.prototype.htmlContainer = null;

  Application.prototype.inherits = util.inherits;

  Application.prototype.router = router;

  Application.prototype.tmpl = tpl;

  Application.prototype.renderHTML = function(target, content, opt_options) {
    var options = {
      replace: (opt_options && opt_options.replace) ?
          opt_options.replace : false
    };
    var tempElem;
    var n;

    if (options.replace === true) {
      tempElem = document.createDocumentFragment().innerHTML = content;
      n = tempElem.firstChild();
      target.parentElement.insertBefore(n, t);
      return;
    }
    target.innerHTML = content;
  };

  Application.prototype.renderView = function(content) {
    if (!this.htmlContainer) {
      this.htmlContainer = document.querySelector('main');
    }
    this.renderHTML(this.htmlContainer, content());
  };

  Application.prototype.route = function(method, path, handler) {
    console.log('attaching');
    router.route(method, path, function() {
      console.log('Auth', Application.prototype.auth.isAuthorized());
      if (Application.prototype.auth.isAuthorized()) {
        handler();
      } else {
        Authenticator.prototype.authorize(router.refresh, router);

        console.log('user is not authorized. Refresh is needed');
      }
    });
  };

  Application.prototype.start = function() {
    analytics.attach();
    this.handleRoutingErrors();
    this.router.run(Application.DefaultRoute);
  };

  Application.prototype.watch = function(prop, thisObj) {
    if (typeof prop === 'string' || typeof prop === 'number') {
      // not a function or array
      return ko.observable(prop);
    } else if (Array.isArray(prop)) {
      return ko.observableArray(prop);
    } else if (typeof prop === 'function') {
      return ko.computed(prop, thisObj);
    } else {
      var obj = {};
      for (var objProp in prop) {
        if (prop.hasOwnProperty(objProp) &&
            objProp.charAt(objProp.length - 1) !== '_') {
          obj[objProp] = Application.prototype.watch(prop[objProp]);
        }
      }
      return obj;
    }
  };

  Application.prototype.handleRoutingErrors = function() {
    var app = this;
    var router = this.router;
    var errorPaths = {
      '403': app.config.route.root + 'error403',
      '404': app.config.route.root + 'error404',
      '500': app.config.route.root + 'error500'
    };
    var pattern = /\s(403|404|500)\s/;
    this.router.error = function(message, originalError) {
      var errorCode, patternMatches;

      if (!originalError) {
          originalError = new Error();
      }

      originalError.message = [message, originalError.message].join(' ');
      patternMatches = originalError.message.match(pattern);

      if (patternMatches !== null && patternMatches[1]) {

      }

      this.trigger('error', {
        message: originalError.message,
        error: originalError
      });

      this.log(originalError.message, originalError);
      /**
       * If there is a route that corresponds to the error code, render that.
       * Default to jsut error (if the route exists);
       */

    };
  };

  return new Application();

});