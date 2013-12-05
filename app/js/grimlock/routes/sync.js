/*global define */
/**
 * @fileoverview Sync route.
 */

define(function(require) {

  /** requirements */
  var UserModel = require('grimlock/models/user');
  var system = require('grimlock/system');



  /** Route implementation. */
  // paths referenced in the route.
  var path = system.config.route.root + 'sync';

  // route handler.
  var route = system.router.get(path, function(context) {
    system.logger.debug('ROUTE:', path);

    system.viewmodel.set('user', new UserModel());
    system.renderView(system.tmpl.sync());
  });

  return route;
});