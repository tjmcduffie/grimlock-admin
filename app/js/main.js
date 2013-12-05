/*global define, window */
/**
 * @fileoverview Application instantiation file. It instantiates the
 *     application and assigns it to a global variable if available.
 */

define(function(require) {

  /** Requirements */
  var App = require('grimlock/app');
  var config = require('config'); // need to load config here so requirejs can
                                  // be configured with the right paths.

  var grimlock = new App();

  // assign to the global namespace.
  if (window !== undefined) {
    window['GRMLCK'] = grimlock;
  } else {
    GRMLCK = grimlock;
  }

});
