/*global define */
/**
 * @fileoverview Welcome route. The user passes through this when they are
 * logging into the site for the first time.
 */

define(function(require) {

  /** requirements */
  var UserModel = require('grimlock/models/user');
  var system = require('grimlock/system');



  /** Route implementation. */
  // paths referenced in the route.
  var path = system.config.route.root + 'welcome';
  var pathHome = system.config.route.root + 'home';

  // route handler.
  var route = system.router.get(path, function(context) {
    system.logger.debug('ROUTE:', path);

    // load the remote User info
    new UserModel()
      .hydrate()
      .then(function(model) {
        system.viewmodel.set('user', model);
        context.redirect(pathHome);
      })
      .catch(function(reason) {
        system.logger.error(reason);
      });

    // This is where we'll want to ping the local API to see if the remote user
    // has a corresponding local user or if we need to create one.
  });

  return route;
});