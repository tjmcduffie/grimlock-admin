/*global define */
/**
 * @fileoverview Sign In route.
 */

define(function(require) {

  /** requirements */
  var SiteModel = require('grimlock/models/site');
  var system = require('grimlock/system');



  /**
   * Route for the home page.
   */
  var path = system.config.route.root + 'sign-in';
  var welcomePath = system.config.route.root + 'welcome';

  // route handler.
  var route = system.router.get(path, function(context) {
    system.logger.debug('ROUTE:', path);

    system.renderView(system.tmpl.signin());
    system.auth
      .authorize()
      .then(function() {
        context.redirect(welcomePath);
      });
  });

  return route;
});