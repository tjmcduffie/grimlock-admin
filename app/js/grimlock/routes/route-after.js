/*global define */
/**
 * @fileoverview Post routing hook.
 */

define(function(require) {

  /** requirements */
  var system = require('grimlock/system');



  /** Route implementation. */
  // paths referenced in the route.
  var path = system.config.route.root;

  // Observe the viewmodel
  system.router.after(function() {
    try {
      system.viewmodel.observe();
    } catch (e) {
      system.logger.error(e.message);
    }

  });

  return null;
});