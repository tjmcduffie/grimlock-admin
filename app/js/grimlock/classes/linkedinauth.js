/*global define, window */
define(function(require) {

  /** requirements */
  var LIN = require('linkedinapi');
  var Promise = require('q');
  var config = require('config');
  var logger = require('grimlock/classes/logger');



  /** provision */
  var LinkedInAuth = function() {
    if (!LinkedInAuth.isLoaded) {
      IN.init({
        api_key: config.IN.API_KEY,
        authorize: config.IN.AUTHORIZE
      });
    }
  };

  LinkedInAuth.prototype.authorizationDeferred_ = Promise.defer();

  LinkedInAuth.prototype.connectionDeferred_ = Promise.defer();

  LinkedInAuth.prototype.isConnected = false;

  LinkedInAuth.prototype.isAuthorized = false;

  LinkedInAuth.prototype.authorize  = function() {
    logger.debug('LIN: Authorizing');
    if (IN && IN.parse) {
      IN.parse(document.body);
    }
    IN.Event.on(IN, 'auth', this.authorizationReady_, this);
    return this.authorizationDeferred_.promise;
  };

  LinkedInAuth.prototype.authorizationReady_ = function() {
    logger.debug('LIN: Authorizaton ready');
    var time = 1800000; // 30 min
    this.keepAliveInterval_ = setInterval(this.keepAlive_.bind(this), time);
    this.isAuthorized = IN.User.isAuthorized();
    this.authorizationDeferred_.resolve(arguments);
  };

  LinkedInAuth.prototype.connect = function() {
    logger.debug('LIN: Connecting');
    IN.Event.on(IN, 'systemReady', this.connectionReady_, this);
    return this.connectionDeferred_.promise;
  };

  LinkedInAuth.prototype.connectionReady_ = function() {
    logger.debug('LIN: Connection ready');
    this.isConnected = true;
    this.isAuthorized = IN.User.isAuthorized();
    this.connectionDeferred_.resolve(arguments);
  };

  LinkedInAuth.prototype.disconnect = function() {
    logger.debug('LIN: Disconnecting');
    IN.User.logout();
  };

  LinkedInAuth.prototype.keepAliveInterval_ = null;

  LinkedInAuth.prototype.keepAlive_ = function() {
    IN.User.refresh();
  };

  return LinkedInAuth;

});