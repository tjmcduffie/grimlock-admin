/*global define */
/**
 * @fileoverview Application Core. This pulls together the necessary pieces and
 *     kicks the whole thing off.
 */

define(function(require) {

  /** requirements */
  var analytics = require('grimlock/modules/analytics');
  var routes = require('routes');
  var system = require('grimlock/system');



  /**
   * Constructs the application, sets some props and runs the start method.
   *
   * @constructor
   */
  var Application = function() {

    this.system_ = system;
    this.routes_ = routes;
    this.start_();

  };


  /**
   * Application routes. Provides an array or routes to register.
   * @type {Array}
   * @private
   */
  Application.prototype.routes_;


  /**
   * Application System. Provides interface to all global modules & utilities.
   *
   * @type {System}
   * @private
   */
  Application.prototype.system_;


  /**
   * Starts the application.
   * @private
   */
  Application.prototype.start_ = function() {

    // only enable analytics if we're in the production environment.
    if (this.system_.config.isProd()) {
      this.system_.analytics();
    }

    // Route the request using the root route.
    this.system_.router.run(system.config.route.root);

  };


  return Application;

});