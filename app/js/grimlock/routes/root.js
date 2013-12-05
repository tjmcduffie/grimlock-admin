/*global define */
/**
 * @fileoverview Root route.
 */

define(function(require) {

  /** requirements */
  var system = require('grimlock/system');



  /** Route implementation. */
  // paths referenced in the route.
  var path = system.config.route.root;
  var homePath = system.config.route.root + 'home';

  // route handler.
  var route = system.router.get(path, function(context) {
    system.logger.debug('ROUTE:', path);
    context.redirect(homePath);
  });

  return route;
});