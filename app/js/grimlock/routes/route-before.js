/*global define */
/**
 * @fileoverview Pre routing hook.
 */

define(function(require) {

  /** requirements */
  var SiteModel = require('grimlock/models/site');
  var system = require('grimlock/system');



  /** Route implementation. */
  // paths referenced in the route.
  var pathSignIn = system.config.route.root + 'sign-in';
  var pathWelcome = system.config.route.root + 'welcome';

  // Auth check Before
  system.router.before({except: {path: [pathSignIn]}}, function() {
    system.logger.debug('ROUTER.Before.Auth.check', system.auth.isAuthorized);
    if (!system.auth.isAuthorized) {
      system.logger.debug('REDIRECTING TO:', pathSignIn);
      this.redirect(pathSignIn);
    }
    return system.auth.isAuthorized;
  });

  // ViewModel Before
  system.router.before(function() {
    var siteVMKey = 'site';
    var isSiteViewModelReady = system.viewmodel.get(siteVMKey);
    system.logger.debug('ROUTER.Before.SiteModel.check', isSiteViewModelReady);

    system.viewmodel.set('loading', true);
    if (!isSiteViewModelReady) {
      new SiteModel()
        .hydrate()
        .then(function(model) {
          system.viewmodel.set(siteVMKey, model);
        });
    }
  });

  return null;
});