/*global define, window */
/**
 * @fileoverview Logger Class. Provides interface to the application logger.
 */

define(function(require) {

  /** requirements */
  var config = require('config');


  if (!config.isProd()) {
    return console;
  }

  var Console = function() {

    Console.methods.forEach(function(method) {
      if (!this[method]) {
        this[method] = Console.noop;
      }
    });
  };

  Console.methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml',
      'error', 'group', 'groupCollapsed', 'info', 'log', 'markTimeline',
      'profile', 'profileEnd', 'table', 'time', 'timeeEnd', 'timeStamp',
      'trace', 'warn'];

  Console.noop = function() {};

  Console.debugLevels = {
    1: null,
    2: ['debug', 'error', 'info', 'log', 'warn'],
    3: ['debug', 'error', 'warn'],
    4: ['error', 'warn'],
    5: ['error']
  };

  Console.prototype.debug = function() {

  };

  Console.prototype.error = function() {

  };

  Console.prototype.info = function() {

  };

  Console.prototype.log = function() {

  };

  Console.prototype.warn = function() {

  };

});